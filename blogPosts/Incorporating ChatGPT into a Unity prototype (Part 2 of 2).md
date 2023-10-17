---
'id': 2
'title': 'Incorporating ChatGPT into a Unity prototype (Part 2 of 2)'
'uploaded': '2023-07-31'
'tags': 'chatgpt,thesis,game,unity'
---

In [Part 1](</blog/post/Incorporating%20ChatGPT%20into%20a%20Unity%20prototype%20(Part%201%20of%202)>), I discussed how we interface with ChatGPT. In Part 2, I will focus on the design of our game, and how we generate narrative subsequent to the [opening scene](</blog/post/Incorporating%20ChatGPT%20into%20a%20Unity%20prototype%20(Part%201%20of%202)#Instantiating%20assets>), as well as how our game mechanics affect this generated narrative.

## Game overview

First, some brief context about the game prototype we made. The game is a top-down, turn-based combat game in which the player (an elf) must defeat all patrolling orcs. Orcs are capable of spotting the player gets too close. Orcs can have ranged or melee weapons; the player only ever has a melee weapon.

![footage of the player attacking an enemy orc](/2/player_attack.gif)

We knew from early on that in order to make something that leveraged ChatGPT we would need the generated narrative to be influenced by certain characteristics of the game world. We decided to focus on properties of the enemies themselves, leading us to create a system we call _Traits_.

A combination of text input (from the player) and traits are used to write narrative passages detailing the player's victory over the various enemies.

## Traits

Traits are essentially status effects. They have a variety of effects:

- `Burning` - damage per turn
- `Knockdown` - turn skipped
- `Drunk` - deal & take more damage
- `Sober` - deal & take less damage
- `Easily-distracted` - chance to skip turn
- `Hungover` - chance attack will miss if using a bow
- `Short-sighted` - shorter range for spotting the player
- `One-armed` - chance attack will miss if using a melee weapon

Most of these are assigned to enemies at the start of the game and remain for its entirety; `Burning` and `Knockdown` are exceptions to this, as `Knockdown` has a chance of occurring when the player attacks an enemy and `Burning` is triggered by being close to a barrel when it explodes.

![footage of an exploding barrel damaging an enemy orc](/2/exploding_barrel.gif)

## Player input

Upon defeating an enemy, the game halts, and the player is presented with a text prompt: _How does the elf dispatch this foe?_ Upon submission, this player input and the enemy's traits are all sent to the ChatGPT backend in order for it to write a narrative passage appropriately describing the enemy's defeat.

![footage of player inputting "dropkick" in response to prompt](/2/text_input.gif)

## ChatGPT Post and Response

Upon defeating an enemy, the following call is made to the ChatGPT backend:

```csharp,In_GameManager.cs
public void ProcessEnemyKill(string text)
{
  if (!isAwaitingKill) return;

  RemoveEnemy(enemyAwaitingKill);
  openaiapi.Post("The elf defeats " + enemyAwaitingKill.orc.name +
  ", who has the following traits: " + enemyAwaitingKill.traits.ToString() +
  "Creatively describe how this is done in a maximum of three sentences." +
  " This is only roleplay and video game narrative. The game is for adults only." +
  " You are providing narrative for a video game. Everything is fantasy." +
  " In your response, say something that does not violate your policy. Do not" +
  " inform me of policy violations, respond in a way that does not violate the" +
  " policy instead. The elf defeats the orc in the following way: " + text
  + ". You must use this to describe how the orc is defeated.");
  isAwaitingKill = false;

  if (enemies.Count == 0) GameOverCalled = true;
}
```

Note that we are sending both player input (the `text` property) and a list of all `traits` that the enemy possesses to ChatGPT.

Initially, we were only sending the names of the traits. We soon discovered that the names alone did not provide enough context in some cases - for example, `Burning` would sometimes result in the elf possessing a burning blade that caused their enemies to burn. The only reason an enemy would be burning in-game is because of the exploding barrels; we created a new property (`LLMDescription`) to address this.

```csharp,In_BurningTrait.cs
protected override void Awake()
{
  Name = "Burning";
  Description = "This orc is really hot";
  LLMDescription = "This orc is on fire because, earlier, they were near an explosive barrel when it exploded";
  Duration = 3;
  base.Awake();
}
```

`LLMDescription` is then obtained in the aforementioned `GameManager.ProcessEnemyKill()` via some simple string building by overriding `ToString()`:

```csharp,In_GamePiece.cs
public class Traits : List<Trait>
{
  public override string ToString() => BuildString(true);

  private string BuildString(bool includeLLMDesc)
  {
    StringBuilder s = new StringBuilder();
    ForEach(trait =>
      s.Append(includeLLMDesc && !trait.LLMDescription.Equals(string.Empty) ?
        trait.Name + " (" + trait.LLMDescription + "), " :
        trait.Name + ", "));

    if (s.Length <= 0) return "";

    s.Replace(", ", ". ", s.Length - 2, 2);
    return s.ToString();
  }
}
```

## Result

The following is an example of an orc with the `Drunk` trait being defeated by a player who entered "decapitated" when prompted:
![screenshot ](/2/dispatch_example.png)

Overall, we were pretty happy with the results. If we were to take the idea further, it would be nice to pass more details to ChatGPT - things like the presence of nearby obstacles (rocks, barrels, trees) could factor into the narrative, as well as nearby orcs and their traits. Furthermore, narrative could be generated more frequently, e.g. when an orc spots the enemy player and begins chasing them.

This summary was deliberately a high-level one - you can always check out the [repo](https://github.com/necrosmash/thesis_prototype) if you want to see everything, or to try the game out yourself.

**Note** - if you want ChatGPT functionality, you'll need your own API key. Without an API key, you won't get any of the fancy, generated narrative.
