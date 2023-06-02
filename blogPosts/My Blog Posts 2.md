---
"id": 2
"title": "My Blog Posts 2"
"date": "2023-05-23"
"tags": "test, markdown2"
---

# this is bp2
## smaller?
Hi there

```
ChatGPTPost chatGPTPost = new ChatGPTPost();
chatGPTPost.model = "gpt-3.5-turbo";
chatGPTPost.messages = new Message[previousMessages.Count + 1];

for (int i = 0; i < previousMessages.Count; i++)
{
    chatGPTPost.messages[i] = new Message(previousMessages[i].role, previousMessages[i].content);
}
Message nextMessage = new Message("user", prompt);
chatGPTPost.messages[chatGPTPost.messages.Length - 1] = nextMessage;
previousMessages.Add(nextMessage);

string newChatGPTPostData = JsonUtility.ToJson(chatGPTPost);
StartCoroutine(Post(GenerateRequest(chatGptUrl, newChatGPTPostData)));
```