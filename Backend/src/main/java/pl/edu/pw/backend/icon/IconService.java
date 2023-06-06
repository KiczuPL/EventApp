package pl.edu.pw.backend.icon;

import java.io.IOException;

public interface IconService {
    byte[] getIcon(String filename) throws IOException;
}
