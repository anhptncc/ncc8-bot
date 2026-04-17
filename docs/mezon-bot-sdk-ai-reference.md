# Mezon Bot SDK - AI Reference

Tai lieu nay duoc tong hop tu:
- https://mezon.ai/docs/developer/mezon-sdk/integration-bot-sdk/usage-and-examples
- https://mezon.ai/docs/developer/mezon-sdk/integration-bot-sdk/api-references

Muc tieu: cung cap "ngu canh ngan gon + du chinh xac" de AI agent co the:
- tra cuu nhanh API quan trong,
- sinh code bot dung tham so,
- han che nham lan giua cac method/event.

## 1) Khoi tao va dang nhap

### Constructor
`new MezonClient(config: ClientConfigDto)`

`ClientConfigDto`:
- `botId` (string, bat buoc)
- `token` (string, bat buoc)
- `host` (string, mac dinh `gw.mezon.ai`)
- `port` (string, mac dinh `443`)
- `useSSL` (boolean, mac dinh `true`)
- `timeout` (number, mac dinh `7000`)
- `mmnApiUrl` (string, mac dinh `https://dong.mezon.ai/mmn-api/`)
- `zkApiUrl` (string, mac dinh `https://dong.mezon.ai/zk-api/`)

### Dang nhap
- `await client.login()` -> `Promise<string>` (session data JSON string)
- Khi thanh cong, client phat event `"ready"`.

### Dang xuat / cleanup
- `client.closeSocket()` dong websocket va reset event manager.

## 2) Cac object cot loi

## `MezonClient`
- Quan ly session, websocket, cache, event.
- Cache chinh:
  - `client.clans: CacheManager<string, Clan>`
  - `client.channels: CacheManager<string, TextChannel>`

Methods thuong dung:
- `login(): Promise<string>`
- `sendToken(tokenEvent: APISentTokenRequest): Promise<any>`
- `getListFriends(limit?, state?, cursor?)`
- `addFriend(username: string)`
- `acceptFriend(userId: string, username: string)`
- `createDMchannel(userId: string)`
- `closeSocket(): void`

## `Clan`
- Dai dien cho server/community.
- Thuoc tinh chinh: `id`, `name`, `welcome_channel_id`, `channels`, `users`.

Methods thuong dung:
- `loadChannels(): Promise<void>`
- `getClientId(): string | undefined`
- `listRoles(limit?, state?, cursor?)`
- `updateRole(roleId, request)`
- `listChannelVoiceUsers(channel_id?, channel_type?, limit?, state?, cursor?)`

## `TextChannel`
- Dai dien kenh text/thread/DM/group.
- Thuoc tinh chinh: `id`, `name`, `channel_type`, `is_private`, `clan`, `messages`.

Methods thuong dung:
- `send(content, mentions?, attachments?, mention_everyone?, anonymous_message?, topic_id?, code?)`
- `sendEphemeral(receiver_id, content, reference_message_id?, mentions?, attachments?, mention_everyone?, anonymous_message?, topic_id?, code?)`
- `addQuickMenuAccess(body)`
- `deleteQuickMenuAccess(botId?)`
- `playMedia(url, participantIdentity, participantName, name)`

## `Message`
- Dai dien 1 tin nhan cu the.
- Thuoc tinh chinh: `id`, `sender_id`, `content`, `mentions`, `attachments`, `reactions`, `topic_id`, `channel`.

Methods:
- `reply(content, mentions?, attachments?, mention_everyone?, anonymous_message?, topic_id?, code?)`
- `update(content, mentions?, attachments?, topic_id?)`
- `react(dataReactMessage)`
- `delete()`

## `User`
- Dai dien user trong context clan (bao gom DM clan `"0"`).

Methods:
- `sendDM(content, code?)`
- `sendToken(sendTokenData)`
- `createDmChannel()`

## 3) Kieu du lieu hay dung

## `ChannelMessageContent`
Fields:
- `t?: string` (text chinh)
- `hg?`, `ej?`, `lk?`, `mk?`, `vk?` (metadata hashtag/emoji/link/markdown/voice-link)
- `embed?: IInteractiveMessageProps[]`
- `components?: IMessageActionRow[]`

## `APISentTokenRequest`
Fields:
- `receiver_id` (bat buoc)
- `amount` (bat buoc)
- `sender_id?`, `note?`, `sender_name?`, `extra_attribute?`, `mmn_extra_info?`

SDK tu xu ly:
- ephemeral key pair,
- nonce,
- zk proofs (sau khi `login()`).

## `ReactMessagePayload`
Fields:
- `emoji_id: string`
- `emoji: string`
- `count: number` (thuong set `1`, server quan ly)
- `action_delete?: boolean` (`false` them, `true` xoa)
- `id?: string`

## 4) Events quan trong de AI map logic

### Message events
- `onChannelMessage((e) => ...)`
- `onMessageReaction((e) => ...)`
- `onMessageButtonClicked((e) => ...)`
- `onDropdownBoxSelected((e) => ...)`

### Channel events
- `onChannelCreated((e) => ...)`
- `onChannelUpdated((e) => ...)`
- `onChannelDeleted((e) => ...)`

### User/Clan events
- `onAddClanUser((e) => ...)`
- `onUserClanRemoved((e) => ...)`
- `onUserChannelAdded((e) => ...)`
- `onUserChannelRemoved((e) => ...)`

### Voice/stream events
- `onVoiceStartedEvent((e) => ...)`
- `onVoiceEndedEvent((e) => ...)`
- `onVoiceJoinedEvent((e) => ...)`
- `onVoiceLeavedEvent((e) => ...)`
- `onStreamingJoinedEvent((e) => ...)`
- `onStreamingLeavedEvent((e) => ...)`
- `onWebrtcSignalingFwd((e) => ...)`

### Other events
- `onTokenSend((e) => ...)`
- `onGiveCoffee((e) => ...)`
- `onClanEventCreated((e) => ...)`
- `onNotification((e) => ...)`
- `onQuickMenuEvent((e) => ...)`

## 5) Enum/constant can nho

## `ChannelType`
- `CHANNEL_TYPE_CHANNEL = 1`
- `CHANNEL_TYPE_GROUP = 2`
- `CHANNEL_TYPE_DM = 3`
- `CHANNEL_TYPE_GMEET_VOICE = 4`
- `CHANNEL_TYPE_FORUM = 5`
- `CHANNEL_TYPE_STREAMING = 6`
- `CHANNEL_TYPE_THREAD = 7`
- `CHANNEL_TYPE_APP = 8`
- `CHANNEL_TYPE_ANNOUNCEMENT = 9`
- `CHANNEL_TYPE_MEZON_VOICE = 10`

## `TypeMessage`
- `Chat = 0`
- `ChatUpdate = 1`
- `ChatRemove = 2`
- `Typing = 3`
- `Indicator = 4`
- `Welcome = 5`
- `CreateThread = 6`
- `CreatePin = 7`
- `MessageBuzz = 8`
- `Topic = 9`
- `AuditLog = 10`
- `SendToken = 11`
- `Ephemeral = 12`

## 6) Snippets cho AI (copy-paste)

```ts
import { MezonClient } from "mezon-sdk";

const client = new MezonClient({
  botId: process.env.MEZON_BOT_ID!,
  token: process.env.MEZON_BOT_TOKEN!,
});

client.on("ready", () => {
  console.log("Bot ready:", client.clientId);
});

client.onChannelMessage(async (msg) => {
  if (msg.sender_id === client.clientId) return;
  const text = msg.content?.t?.trim().toLowerCase();
  if (text === "!ping") {
    const channel = await client.channels.fetch(msg.channel_id);
    await channel.send({ t: "pong" });
  }
});

await client.login();
```

```ts
// Gui tin nhan + mention + attachment
await channel.send(
  { t: "Hello @user" },
  [{ user_id: "user-id", s: 6, e: 11 }],
  [{ url: "https://example.com/a.png", filename: "a.png", filetype: "image/png" }],
  false,
  false,
  undefined,
  0
);
```

```ts
// Gui ephemeral message cho 1 user cu the
await channel.sendEphemeral("receiver-user-id", { t: "Chi ban thay tin nay" });
```

```ts
// Reply / update / react / delete
await message.reply({ t: "Tra loi" });
await message.update({ t: "Noi dung moi" });
await message.react({ emoji_id: "thumbs_up", emoji: ":thumbsup:", count: 1, action_delete: false });
await message.delete();
```

```ts
// DM user (qua DM clan "0")
const dmClan = client.clans.get("0");
const user = await dmClan!.users.fetch("user-id");
await user.sendDM({ t: "Xin chao tu bot" });
```

```ts
// Send token
await client.sendToken({
  receiver_id: "user-id",
  amount: 1000,
  note: "Payment",
});
```

## 7) Prompt templates cho AI codegen

### Template A - Tao command bot
```text
Ban la senior TypeScript bot engineer.
Hay viet command moi cho Mezon bot voi yeu cau:
- Trigger: <trigger>
- Input: <input-format>
- Output: <expected-output>
- Fail cases: <error-cases>

Rang buoc:
- Dung mezon-sdk APIs dung tham so.
- Bo qua message cua bot (sender_id === client.clientId).
- Co try/catch va tra loi loi than thien.
- Tach logic thanh ham rieng de de test.
```

### Template B - Xu ly event
```text
Hay viet event handler cho <event-name> trong mezon-sdk.
Can:
- validate payload toi thieu,
- log cac field quan trong,
- update cache/noi bo state neu can,
- tranh crash (try/catch + guard clauses).
Tra ve ma TypeScript hoan chinh.
```

### Template C - Refactor an toan
```text
Refactor doan bot code sau nhung KHONG doi hanh vi:
<paste-code>

Yeu cau:
- Giu nguyen API contract mezon-sdk.
- Tang do ro rang, tach ham, dat ten ro nghia.
- Them comments ngan o doan phuc tap.
- Dua kem checklist test thu cong.
```

## 8) Luu y quan trong cho AI agent

- Luon `await client.login()` truoc khi thao tac channel/user.
- Event listener nen dang ky truoc `login()` de khong miss event.
- DM flow thuong dung clan ID `"0"`.
- `send/update/reply/react/delete` deu la async -> can `await` + `try/catch`.
- Khong hardcode token/botId; dung env vars.
- Khong spam request: SDK co queue (`AsyncThrottleQueue`) nhung van nen throttle logic command phuc tap.
- Kiem tra `message.sender_id !== client.clientId` de tranh vong lap tu tra loi chinh minh.

## 9) Nguon goc

- Usage and Examples: https://mezon.ai/docs/developer/mezon-sdk/integration-bot-sdk/usage-and-examples
- API References: https://mezon.ai/docs/developer/mezon-sdk/integration-bot-sdk/api-references
