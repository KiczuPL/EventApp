package pl.edu.pw.backend.user;

import pl.edu.pw.backend.user.forms.CreateUserForm;
import pl.edu.pw.backend.user.projections.UserDTO;

import java.util.List;

public interface UserService {
    AppUser getUserById(String id);

    List<AppUser> getAllUsers();

    UserDTO getUserData(CreateUserForm form);
}
