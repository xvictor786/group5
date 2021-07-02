
package com.api;

import java.sql.*;

public class ConMan {
     static Connection con;
    static String url;

    public static Connection getConnection() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            try {
                url = "jdbc:mysql://skimtech.my:3306/skimtech_group5_";
                con = DriverManager.getConnection(url, "skimtech_group5_", "_Skimtech_Group5@umt");
            } catch (SQLException e) {
                e.printStackTrace();

            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return con;
    }

}
