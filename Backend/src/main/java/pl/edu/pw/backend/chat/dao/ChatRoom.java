package pl.edu.pw.backend.chat.dao;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@RequiredArgsConstructor
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotNull
    private String name;
    @OneToMany(fetch = FetchType.EAGER)
    private List<ChatLine> lines = new ArrayList<>();

    public ChatRoom(String name) {
        this.name = name;
    }
}
