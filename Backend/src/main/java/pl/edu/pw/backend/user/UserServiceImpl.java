package pl.edu.pw.backend.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.event.dto.EventDTO;
import pl.edu.pw.backend.user.forms.CreateUserForm;
import pl.edu.pw.backend.user.projections.UserDTO;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    public AppUser getUserById(String id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    public List<AppUser> getAllUsers() {
        return userRepository.findAll();
    }


    @Override
    public UserDTO getUserData(CreateUserForm form) {
        String id = form.id();
        String username = form.username();

        Optional<AppUser> user = userRepository.findById(id);
        if (user.isPresent()) {
            AppUser u = user.get();
            return new UserDTO() {
                @Override
                public String getId() {
                    return u.getId();
                }

                @Override
                public String getUsername() {
                    return u.getUsername();
                }
            };
        }
        AppUser newUser = AppUser.builder()
                .id(id)
                .username(username)
                .build();
        userRepository.save(newUser);
        log.info("added new user {}", newUser);

        return new UserDTO() {
            @Override
            public String getId() {
                return newUser.getId();
            }

            @Override
            public String getUsername() {
                return newUser.getUsername();
            }
        };
    }

    @Override
    public List<EventDTO> getUserEvents(String id) {
        List<EventDTO> events = userRepository.findUserEvents(id);
        return events;//userRepository.findDistinctEventsById(id);
    }
}
