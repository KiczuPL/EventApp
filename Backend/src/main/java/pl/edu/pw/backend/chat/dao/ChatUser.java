package pl.edu.pw.backend.chat.dao;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
public class ChatUser {
    @Id
    private String id;

    @NotNull
    private String name;
    @ManyToMany(fetch = FetchType.EAGER)
    private List<ChatRoom> chats = new ArrayList<>();

    public ChatUser(String id, String name) {
        this.id = id;
        this.name = name;
    }


}
