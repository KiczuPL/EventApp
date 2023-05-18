package pl.edu.pw.backend.user;

import pl.edu.pw.backend.user.forms.CreateUserForm;

import java.util.List;

public interface UserService {
    AppUser getUserById(Long id);
    List<AppUser> getAllUsers();

    AppUser addUser(CreateUserForm createUserForm);
}
