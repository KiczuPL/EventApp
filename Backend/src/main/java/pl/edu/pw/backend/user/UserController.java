package pl.edu.pw.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.backend.event.dto.EventDTO;
import pl.edu.pw.backend.user.forms.CreateUserForm;
import pl.edu.pw.backend.user.projections.UserDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/firstlogin")
    private UserDTO login(@RequestBody CreateUserForm form) {
        return userService.getUserData(form);
    }

    @GetMapping("/{id}")
    private AppUser loginasd(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @GetMapping("/{id}/events")
    private List<EventDTO> getUserEvents(@PathVariable String id) {
        return userService.getUserEvents(id);
    }
}
