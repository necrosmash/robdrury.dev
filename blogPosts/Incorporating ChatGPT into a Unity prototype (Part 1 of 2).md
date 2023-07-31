---
"id": 1
"title": "Incorporating ChatGPT into a Unity prototype (Part 1 of 2)"
"uploaded": "2023-06-29"
"updated": "2023-07-31"
"tags": "chatgpt,thesis,game,unity"
---

Is it a good idea to add ChatGPT to a Unity game? You may have your own thoughts already, but this was the question that my thesis partner and I sought to answer for our Master's thesis.

In this post I would like to go how we incorporated ChatGPT into Unity. This is a relatively high-level description of our approach. If you want more detail, you can always check out the [repo](https://github.com/necrosmash/thesis_prototype) yourself.

In our prototype, we have two main ways of making use of ChatGPT:
* setting property values for instantiated assets
* generating narrative

(If you wish to read the thesis in its entirety, you can get it [here](https://drive.google.com/file/d/1q2msreCh4MQC_ZlNceXdsYCNj28wwmyD/view?usp=sharing))

## REST client
Let's first talk about how one can even communicate with the ChatGPT backend in the first place.

Despite there being some projects that aim to allow developers to communicate with OpenAI's APIs (either as a C# library or a Unity package) we had better luck writing our own simple REST client. Luckily, Unity has its `UnityWebRequest` to make things easier.

```csharp,In_OpenAiApi.cs
private UnityWebRequest GenerateRequest(string url, string postData)
{
  UnityWebRequest request = UnityWebRequest.Post(
    url,
    postData,
    "application/json"
  );
  request.SetRequestHeader("Authorization", "Bearer " + apiKey);
  return request;
}
```

Whenever we want to POST to the ChatGPT backend, we invoke a `Post` method:

```csharp,In_OpenAiApi.cs
public void Post(string prompt)
{
  if (apiKey == null) model = Model.test;
  switch (model)
  {
    case Model.chatgpt:
      ChatGPTPost chatGPTPost = new ChatGPTPost();
      chatGPTPost.model = "gpt-3.5-turbo";
      chatGPTPost.messages = 
        new Message[previousMessages.Count + 1];

      for (int i = 0; i < previousMessages.Count; i++)
      {
        chatGPTPost.messages[i] = new Message(
          previousMessages[i].role,
          previousMessages[i].content
        );
      }
      Message nextMessage = new Message("user", prompt);
      chatGPTPost.messages
        [chatGPTPost.messages.Length - 1] = nextMessage;
      previousMessages.Add(nextMessage);

      string newChatGPTPostData = JsonUtility.ToJson(chatGPTPost);
      StartCoroutine(Post(GenerateRequest(
        chatGptUrl, newChatGPTPostData
      )));
            
      break;
    default:
    case Model.test:
      response = DaVinciResponse.GenerateTestResponse();
      response.ParseBattleInfo();
      isPostInProgress = false;
      break;
    }
}
```

This works well for our purposes, despite some awkwardness regarding the manual copying of previous messages (it ended up that way to facilitate both the beginning of the game, where we have no previous messages, and the calls subsequent to this).

As you can see, we are copying messages from earlier in the conversation (if there are any) to the messages property of a `ChatGPTPost` class, which is merely a `Serializable` class capable of holding a `model` string and `messages` array. We serialize this using Unity's own `JSONUtility`. 

The response is similarly deserialized:
```csharp,In_OpenAiApi.cs
private IEnumerator Post(UnityWebRequest request)
{
  isPostInProgress = true;
  
  yield return request.SendWebRequest();
  if (request.result != UnityWebRequest.Result.Success)
  {
      Debug.Log(request.error);
  }
  else
  {
    response = JsonUtility.FromJson<ChatGPTResponse>
      (request.downloadHandler.text);

    foreach (ChatGPTResponse.Choice choice in
      ((ChatGPTResponse) response).choices
    )
    {
      previousMessages.Add(new Message(
        choice.message.role, choice.message.content
      ));
    }
      
    if (isFirstPost)
    {
      response.ParseBattleInfo();
      isFirstPost = false;
    }
    else response.ParseLogString();

    Debug.Log("API call complete");
  }
  
  isPostInProgress = false;
}
```

`response.ParseBattleInfo()` and `response.ParseLogString()` are how we make use of the returned data from ChatGPT for our game. Let's talk about `response.ParseBattleInfo()` first. I'll go over `response.ParseLogString()` in [Part 2](/blog/post/Incorporating%20ChatGPT%20into%20a%20Unity%20prototype%20(Part%202%20of%202)).

## Instantiating assets
As you saw earlier, JSON deserialisation is at the heart of this. Upon launching the game, we make a request to ChatGPT's backend to get the beginning of our narrative, as well as some property values for instantiating our enemies.

The following is our `ChatGPTResponse` class, in its entirety:
```csharp,ChatGPTResponse.cs
using UnityEngine;

[System.Serializable]
public class ChatGPTResponse : APIResponse
{
    public Choice[] choices;

    public override void ParseBattleInfo()
    {
        // choices[0] contains "message"
        if (choices[0] == null)
        {
            throw new BattleInfoNotFoundException();
        }

        battleInfo = JsonUtility.FromJson<BattleInfo>(
          choices[0].message.content
        );
        logString = battleInfo.openingScene;
    }

    public override void ParseLogString()
    {
        logString = choices[0].message.content;
    }

    [System.Serializable]
    public class Choice
    {
        public Message message;
        public int index;
        public string finish_reason;
    }
}
```

The actual conversational response from ChatGPT comes in an array property called `choices` (so-called because the model can come up with multiple possible completions given the user's input prompt). `ParseBattleInfo()` is how we deserialize our very first call to the API, as we ask that ChatGPT gives us both an opening narrative scene and an array of enemies for us to instantiate:

```csharp,In_OpenAiApi.cs
string prompt = Regex.Replace("I want you to return me a JSON object. All" +
" of your output should be a part of the JSON object. Do not output" +
" any text except for the JSON object. Here is the example of the JSON" +
" object: " + JsonUtility.ToJson(new BattleInfo()) + 
" \"weapon\" must be one of the following values: \"sword\", \"hammer\"," +
" \"bow\". It cannot be anything else. \"size\" must be one of the" +
" following values: \"small\", \"medium\", \"large\". It cannot be" +
" anything else. Orc names must also include a descriptor starting" +
" with \"the\", such as \"Uzguk the Undefeated\". Be creative about" +
" these descriptors. Describe the opening scene in the \"openingScene\"" +
" string. The opening scene must be a story about an elf about to engage" +
" in a battle with a group of orcs. It is the beginning of the story" +
" only. Be creative when you come up with descriptions of the orcs." +
" Populate the \"orcs\" array based on the opening scene. ", 
"\"", "\\\"");
```

This prompt grew over time. The sentence _All of your output should be a part of the JSON object_ came about from ChatGPT's tendency to say _Sure! Here's your JSON object:_, followed by the JSON object, thereby breaking everything. Additionally, towards the end, there is _It is the beginning of the story only_; we sometimes had issues with ChatGPT writing a completely self-contained (albeit small) story, including an ending. We needed to remind it that it is writing the setup only.

We're also asking for particular sizes and weapons. The actual deserializing is done in `ChatGPTResponse` via Unity's own `JsonUtility.FromJson` method, as shown above.

We're using our `BattleInfo` class to both describe the structure of the object we want from ChatGPT (in the prompt) and deserialize the result of our call:
```csharp,BattleInfo.cs
[System.Serializable]
public class BattleInfo
{
  public Orc[] orcs;
  public string openingScene;

  [System.Serializable]
  public class Orc
  {
    public string name;
    public string description;
    public string weapon;
    public string size;

    public Weapon weaponEnum;
    public Size sizeEnum;

    public enum Size{
      Small,
      Medium,
      Large
    }

    public enum Weapon{
      Sword,
      Hammer,
      Bow
    }

    // needed for blank prompt info
    public Orc()
    {
      name = string.Empty;
      description = string.Empty;
      weapon = string.Empty;
      size = string.Empty;
    }
  }

  // needed for blank prompt info
  public BattleInfo()
  {
    orcs = new Orc[1];
  }
}
```

Then, when the call is finally complete, we can instantiate our orcs in our `GameManager`:
```csharp,NONAME
BattleInfo.Orc[] orcs = openaiapi.response.battleInfo.orcs;
```

We similarly display the result of the `logString` property of our `ChatGPTRepsonse` - a script attached to a GameObject is repsonsible for adding the opening narrative (and any additional narrative) to a text view. This text view shows combat info as well, as combat progresses:

![Screenshot of game displaying opening scene to the right](/1/1.png)

And that's it! Remember that if this seems light on details you can always check out the [repo](https://github.com/necrosmash/thesis_prototype).

In [Part 2](/blog/post/Incorporating%20ChatGPT%20into%20a%20Unity%20prototype%20(Part%202%20of%202)) I'll go over `response.ParseLogString()`, which is how we handle narrative subsequent to the opening scene. This is also where we attempt to merge enemy characteristics with generated narrative to create a story influenced by the properties of in-game enemies.