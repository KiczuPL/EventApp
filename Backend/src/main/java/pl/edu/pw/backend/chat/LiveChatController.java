package pl.edu.pw.backend.chat;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import pl.edu.pw.backend.chat.dto.ChatLineProjection;
import pl.edu.pw.backend.chat.dto.ChatMessage;

@Controller
@RequiredArgsConstructor
@Slf4j
public class LiveChatController {

    private final ChatRoomService chatRoomService;

    @MessageMapping("/chat/{chatId}/sendMessage")
    @SendTo("/topic/chat/{chatId}")
    public ChatLineProjection greeting(@DestinationVariable Long chatId, ChatMessage message) throws Exception {
        return chatRoomService.sendMessage(chatId, message);
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("New connection: {}", event);
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("Lost connection: {}", event);
    }
}
