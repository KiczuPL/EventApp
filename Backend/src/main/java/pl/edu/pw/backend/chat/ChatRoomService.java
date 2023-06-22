package pl.edu.pw.backend.chat;

import pl.edu.pw.backend.chat.dao.ChatRoom;
import pl.edu.pw.backend.chat.dto.ChatChunkDTO;
import pl.edu.pw.backend.chat.dto.ChatLineProjection;
import pl.edu.pw.backend.chat.dto.ChatMessage;

public interface ChatRoomService {

    ChatLineProjection sendMessage(Long roomId, ChatMessage message);

    ChatRoom createNewChat(String name);

    void joinChat(String userId, String username, Long chatId);

    ChatChunkDTO getMessages(Long roomId, Integer offset, Integer size);

    void leaveChat(Long roomId, String userId);


    void deleteChat(Long roomId);
}
