package pl.edu.pw.backend.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.backend.chat.dto.ChatChunkDTO;
import pl.edu.pw.backend.chat.dto.ChatMessage;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/private/chat")
public class ChatController {

    private final ChatRoomService chatRoomService;


    @GetMapping("/{chatId}/messages")
    public ChatChunkDTO getMessages(@PathVariable Long chatId, @RequestParam Integer offset, @RequestParam Integer size) {
        return chatRoomService.getMessages(chatId, offset, size);
    }

    @PostMapping("/{chatId}/messages")
    public void sendMessage(@PathVariable Long chatId, @RequestBody ChatMessage message) {
        chatRoomService.sendMessage(chatId, message);
    }

    @PostMapping("/{chatId}/leave")
    public void leaveChat(@PathVariable Long chatId, @RequestParam String userId) {
        chatRoomService.leaveChat(chatId, userId);
    }

}
