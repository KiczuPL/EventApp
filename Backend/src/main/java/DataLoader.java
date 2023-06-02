import org.springframework.stereotype.Component;
import pl.edu.pw.backend.event.EventService;
import pl.edu.pw.backend.event.forms.CreateEventForm;
import pl.edu.pw.backend.user.AppUser;
import pl.edu.pw.backend.user.UserService;
import pl.edu.pw.backend.user.forms.CreateUserForm;

import java.time.ZonedDateTime;

@Component
public class DataLoader {

    private final EventService eventService;
    private final UserService userService;

    public DataLoader(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
        loadData();
    }

    public void loadData() {
        System.out.println("AAAAAAAAAAAAAAAAAAAA");
        AppUser u = userService.addUser(new CreateUserForm("Test-user"));
        eventService.addEvent(new CreateEventForm("EventTitle", "Description", ZonedDateTime.now(), 10d, 10d, "beer", u.getId()));
    }

}
