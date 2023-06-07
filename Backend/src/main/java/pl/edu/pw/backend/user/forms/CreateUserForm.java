package pl.edu.pw.backend.user.forms;

import jakarta.validation.constraints.NotEmpty;

public record CreateUserForm(@NotEmpty String username, @NotEmpty String id) {
}
