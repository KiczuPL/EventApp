package pl.edu.pw.backend.chat;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.chat.dao.ChatLine;
import pl.edu.pw.backend.chat.dao.ChatRoom;
import pl.edu.pw.backend.chat.dao.ChatUser;
import pl.edu.pw.backend.chat.dto.*;
import pl.edu.pw.backend.chat.repository.ChatLineRepository;
import pl.edu.pw.backend.chat.repository.ChatRoomRepository;
import pl.edu.pw.backend.chat.repository.ChatUserRepository;

import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    private final ChatLineRepository chatLineRepository;
    private final ChatUserRepository chatUserRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public ChatLineProjection sendMessage(Long roomId, ChatMessage message) {
        log.info("room: {}, message: {}", roomId, message);
        ChatRoom chatRoom = chatRoomRepository.getReferenceById(roomId);
        ChatUser sender = chatUserRepository.getReferenceById(message.getSenderId());
        //log.info("got room: {}", chatRoom);
        ChatLine newLine = new ChatLine(message.getContent(), sender);
        newLine.setCreatedAt(ZonedDateTime.now());
        newLine = chatLineRepository.save(newLine);
        chatRoom.getLines().add(newLine);
        chatRoomRepository.save(chatRoom);
        return chatLineRepository.getChatLineById(newLine.getId());
    }

    @Override
    public ChatRoom createNewChat(String name) {
        ChatRoom chatRoom = new ChatRoom(name);
        chatRoom = chatRoomRepository.save(chatRoom);
        log.info("new chat room: {}", chatRoom);
        return chatRoom;
    }

    @Override
    public void joinChat(String userId, String username, Long chatId) {
        ChatUser user = new ChatUser(userId, username);
        user.getChats().add(chatRoomRepository.getReferenceById(chatId));
        chatUserRepository.save(user);
    }

    @Override
    public ChatChunkDTO getMessages(Long roomId, Integer offset, Integer size) {

        ChatRoomProjection chatRoom = chatRoomRepository.getChatRoomById(roomId);
        List<ChatLineProjection> lines = chatRoom.getLines();
        lines.sort((l1, l2) -> l1.getCreatedAt().compareTo(l2.getCreatedAt()));
        lines = lines.subList(Math.max(0, lines.size() - offset - size), Math.max(0, lines.size() - offset));
        Collections.reverse(lines);
        ChatRoomDTO roomDTO = new ChatRoomDTO(chatRoom.getId(), chatRoom.getName());
        return new ChatChunkDTO(roomDTO, lines);
    }

    @Override
    public void leaveChat(Long roomId, String userId) {
        ChatUser user = chatUserRepository.getReferenceById(userId);
        user.getChats().remove(chatRoomRepository.getReferenceById(roomId));
        chatUserRepository.save(user);
    }

    @Override
    public void deleteChat(Long roomId) {
        chatRoomRepository.deleteById(roomId);
    }
}
