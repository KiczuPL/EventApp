package pl.edu.pw.backend.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.user.forms.CreateUserForm;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public AppUser getUserById(Long id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public AppUser addUser(CreateUserForm createUserForm) {
        return userRepository.save(AppUser.builder()
                .username(createUserForm.username())
                .build());
    }
}
