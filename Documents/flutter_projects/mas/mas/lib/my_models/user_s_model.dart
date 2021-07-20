import 'dart:convert';

User_s userfromJson(String str) => User_s.fromJson(json.decode(str));
String userToJson(User_s data) => json.encode(data.toJson());

class User_s {
  String email;
  String password;

  User_s({this.email, this.password});

  factory User_s.fromJson(Map<String, dynamic> json) => User_s(
        email: json["email"],
        password: json["password"],
      );

  Map<String, dynamic> toJson() => {"email": email, "password": password};
}
