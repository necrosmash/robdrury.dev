---
"id": 1
"title": "Incorporating ChatGPT into a Unity prototype"
"date": "2023-05-28"
"tags": "chatgpt, thesis, game, unity"
---

Is it a good idea to add ChatGPT to a Unity game? You may have your own thoughts already, but this was the question that my thesis partner and I sought to answer for our Master's thesis. In this post I would like to go over the process of incorporating ChatGPT into Unity, and some of the lessons we learned along the way.

In our [prototype](https://github.com/necrosmash/thesis_prototype), we have two main ways of making use of ChatGPT:
* setting property values for instantiated assets
* generating narrative

But first, let's talk about how one can even communicate with the ChatGPT backend in the first place.

(If you wish to read the thesis in its entirety, you can get it [here](https://www.google.com))

## REST client
Despite there being some projects that aim to allow developers to communicate with OpenAI's APIs (either as a C# library or a Unity package) we had better luck writing our own simple REST client. Luckily, Unity has its `UnityWebRequest` to make things easier.

```csharp
// In OpenAiApi.cs
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

You'll need your own API key if you're running the prototype yourself (instructions are in the README of [this](https://github.com/necrosmash/thesis_prototype/releases/tag/v1.0.0)) archive.

Whenever we want to POST to the ChatGPT backend, we invoke a `Post` method:
```csharp
// In OpenAiApi.cs
public void Post(string prompt)
{
  if (apiKey == null) model = Model.test;
  switch (model)
  {
    case Model.chatgpt:
      ChatGPTPost chatGPTPost = new ChatGPTPost();
      chatGPTPost.model = "gpt-3.5-turbo";
      chatGPTPost.messages = new Message[previousMessages.Count + 1];
            
      for (int i = 0; i < previousMessages.Count; i++)
      {
        chatGPTPost.messages[i] = new Message(
          previousMessages[i].role,
          previousMessages[i].content
        );
      }
      Message nextMessage = new Message("user", prompt);
      chatGPTPost.messages[chatGPTPost.messages.Length - 1] = nextMessage;
      previousMessages.Add(nextMessage);

      string newChatGPTPostData = JsonUtility.ToJson(chatGPTPost);
      StartCoroutine(Post(GenerateRequest(chatGptUrl, newChatGPTPostData)));
            
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

## Instantiating assets
JSON deserialisation is at the heart of this. Upon launching the game, we make a request to ChatGPT's backend 

Here's an image for no reason whatsoever
![Animation of enemy kill prompt being answered by player](/1/1.gif)