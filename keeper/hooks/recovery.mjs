// ZCode sends one JSON event on stdin. Keep tool input and error text local.
const chunks = []
let size = 0
for await (const chunk of process.stdin) {
  size += chunk.length
  if (size > 1024 * 1024) process.exit(0)
  chunks.push(chunk)
}

let event
try {
  event = JSON.parse(Buffer.concat(chunks).toString('utf8'))
} catch {
  process.exit(0)
}
if (event?.hook_event_name !== 'PostToolUseFailure' || event.is_interrupt !== false || typeof event.error !== 'string') process.exit(0)

const networkCode = /\b(?:ETIMEDOUT|ECONNRESET|EAI_AGAIN)\b/i
const networkMessage = /\b(?:connection (?:timed out|reset by peer)|502 bad gateway|503 service unavailable|504 gateway timeout)\b/i
const httpStatus = /\b(?:HTTP(?:\/\d(?:\.\d)?)?\s+|status(?:\s+code)?[\s:=]+)(?:502|503|504)\b/i
if ([networkCode, networkMessage, httpStatus].some(pattern => pattern.test(event.error))) {
  process.stdout.write(JSON.stringify({hookSpecificOutput: {
    hookEventName: 'PostToolUseFailure',
    additionalContext: '工具可能遇到了临时网络错误。先核对上次操作是否已经生效。结果未知时保留进度，向用户说明可从当前聊天手动接续。'
  }}))
}
