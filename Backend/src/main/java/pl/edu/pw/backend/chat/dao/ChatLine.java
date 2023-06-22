package pl.edu.pw.backend.chat.dao;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.ZonedDateTime;

@Entity
@Data
@RequiredArgsConstructor
public class ChatLine {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String message;

    @NotNull
    private ZonedDateTime createdAt;
    @ManyToOne
    private ChatUser sender;

    public ChatLine(String message, ChatUser sender) {
        this.message = message;
        this.sender = sender;
    }
}
