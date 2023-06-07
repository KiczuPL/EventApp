package pl.edu.pw.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pw.backend.user.forms.CreateUserForm;
import pl.edu.pw.backend.user.projections.UserDTO;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/firstlogin")
    private UserDTO login(@RequestBody CreateUserForm form) {
        return userService.getUserData(form);
    }
}
