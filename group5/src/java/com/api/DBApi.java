/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.api;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;

public class DBApi {

    static Connection con;
    static ResultSet rs;

     public static JSONObject registerNewUser(String email, String password) {
        JSONObject jo = new JSONObject();
        int ada = 0;

        try {
            con = ConMan.getConnection();
            String sql = "select * from register where email = ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
            }
            if (ada == 1) { //user already exists
                jo.put("status", 1);
            } else {//not yet exist add user into table
                sql = "insert into register (email, password) value(?,?)";
                PreparedStatement ps2 = con.prepareStatement(sql);
                ps2.setString(1, email);
                ps2.setString(2, password);
                ps2.execute();
                jo.put("status", 0);

            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }
    
    public static JSONObject userAuthentication(String email, String pass) {
        JSONObject jo = new JSONObject();
        int ada = 0;

        try {
            con = ConMan.getConnection();
            String sql = "select * from register where email = ? and password = ?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, pass);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
            }
            if (ada == 1) { //user already exists
                jo.put("status", 1);
            } else {//not yet exist add user into table
                jo.put("status", 0);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }

    public static JSONArray getContactDataOwner(String email) {
        JSONArray ja = new JSONArray();
        int index = 0;
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from maksu where owneremail=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, email);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
                JSONObject jo = new JSONObject();
                jo.put("id", rs.getString("id"));
                jo.put("tittle", rs.getString("tittle"));
                jo.put("user_name", rs.getString("user_name"));
                jo.put("user_password", rs.getString("user_password"));
                ja.add(index++, jo);
            }
            if (ada == 1) {// ada data contact
                JSONObject jo = new JSONObject();
                jo.put("status", 1);
                ja.add(index++, jo);
            } else { // x ada data contact
                System.out.print("aaaaaeeee");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return ja;
    }

    public static JSONObject addContactData(String tittle,String uname, String upassword, String owner) {

        JSONObject jo = new JSONObject();

        try {
            con = ConMan.getConnection();
            
            String sql = "insert into maksu (tittle,user_name,user_password,owneremail) "
                    + "value(?,?,?,?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, tittle);
            ps.setString(2, uname);
            ps.setString(3, upassword);
            ps.setString(4, owner);
            ps.executeUpdate();
            jo.put("status", 1);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }

    public static JSONObject getContactDataByID(String id) {
        JSONObject jo = new JSONObject();
        int index = 0;
        int ada = 0;
        try {
            con = ConMan.getConnection();
            String sql = "select * from maksu where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, id);
            rs = ps.executeQuery();
            while (rs.next()) {
                ada = 1;
                
                jo.put("id", rs.getString("id"));
                jo.put("tittle", rs.getString("tittle"));
                jo.put("user_name", rs.getString("user_name"));
                jo.put("user_password", rs.getString("user_password"));
                
            }
            if (ada == 1) {//ada data contacts
                
                jo.put("status", 1);
                
            } else {//tiada data contacts
                
                jo.put("status", 0);
                
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;

    }
    
    public static JSONObject updateContactData(String tittle,String user_name,String user_password,String id) {

        JSONObject jo = new JSONObject();

        try {
            con = ConMan.getConnection();

            String sql = "update maksu set tittle=?, user_name=?, user_password=? where id =?";
                 
            PreparedStatement ps = con.prepareStatement(sql);
            
            ps.setString(1, tittle);
            ps.setString(2, user_name);
            ps.setString(3, user_password);
            ps.setString(4, id);
            
            System.out.println(ps.toString());
            
            ps.executeUpdate();
            jo.put("status", 1);

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return jo;
    }
    
    public static JSONObject delContactDataById(String id){
        JSONObject jo = new JSONObject();
        
        try{
            con = ConMan.getConnection();
            String sql = "delete from maksu where id=?";
            PreparedStatement ps = con.prepareStatement(sql);
           
            ps.setString(1, id);
  
            ps.executeUpdate();
            jo.put("status",1);
            //cara cek, lepas tu 
                       
        } catch(SQLException e){
            e.printStackTrace();
        }
        return jo;
        
    }
    
}
