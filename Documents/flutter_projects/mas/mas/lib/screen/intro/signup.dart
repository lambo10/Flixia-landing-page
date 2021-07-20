import 'package:mas/screen/Bottom_Nav_Bar/bottom_nav_bar.dart';
import 'package:mas/screen/home/home.dart';
import 'package:mas/screen/intro/login.dart';
import 'package:mas/screen/setting/themes.dart';
import 'package:mas/my_models/user.dart';
import 'package:mas/my_models/getResultModel.dart';
import 'package:flutter/material.dart';
import 'package:mas/component/style.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class signUp extends StatefulWidget {
  ThemeBloc themeBloc;
  signUp({this.themeBloc});
  @override
  _signUpState createState() => _signUpState(themeBloc);
}

class _signUpState extends State<signUp> {
  ThemeBloc _themeBloc;
  _signUpState(this._themeBloc);
  User user = User('', '');
  String confirmPass = "";
  var _cliked_registerBTN = false;
  var _cliked_loginBTN = false;
  String output_txt = "";
  Widget build(BuildContext context) {
    MediaQueryData mediaQuery = MediaQuery.of(context);
    final TextEditingController _emailController =
        TextEditingController(text: user.email);
    final TextEditingController _passwordController =
        TextEditingController(text: user.password);
    final TextEditingController _confirm_passwordController =
        TextEditingController(text: confirmPass);

    return Scaffold(
      body: Container(
        height: double.infinity,
        width: double.infinity,

        /// Set Background image in splash screen layout (Click to open code)
        decoration: BoxDecoration(color: colorStyle.background),
        child: Stack(
          children: <Widget>[
            ///
            /// Set image in top
            ///
            Container(
              height: 129.0,
              width: double.infinity,
              decoration: BoxDecoration(
                  image: DecorationImage(
                      image: AssetImage("assets/image/signupHeader.png"),
                      fit: BoxFit.cover)),
            ),
            Container(
              height: double.infinity,
              width: double.infinity,
              child: SingleChildScrollView(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: <Widget>[
                    /// Animation text marketplace to choose Login with Hero Animation (Click to open code)
                    Padding(
                      padding:
                          EdgeInsets.only(top: mediaQuery.padding.top + 130.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Image.asset("assets/image/logo.png", height: 35.0),
                          Padding(
                            padding:
                                const EdgeInsets.only(left: 17.0, top: 7.0),
                            child: Text(
                              "Crypto",
                              style: TextStyle(
                                  fontFamily: "Sans",
                                  color: Colors.white,
                                  fontSize: 27.0,
                                  fontWeight: FontWeight.w300,
                                  letterSpacing: 3.5),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 20.0, right: 20.0, top: 20.0),
                      child: _buildTextFeild(
                          widgetIcon: Icon(
                            Icons.email,
                            color: colorStyle.primaryColor,
                            size: 20,
                          ),
                          controller: _emailController,
                          onchange_func: (value) {
                            user.email = value;
                          },
                          hint: 'Email',
                          obscure: false,
                          keyboardType: TextInputType.emailAddress,
                          textAlign: TextAlign.start),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 20.0, right: 20.0, top: 20.0),
                      child: _buildTextFeild(
                          widgetIcon: Icon(
                            Icons.vpn_key,
                            size: 20,
                            color: colorStyle.primaryColor,
                          ),
                          controller: _passwordController,
                          onchange_func: (value) {
                            user.password = value;
                          },
                          hint: 'Password',
                          obscure: true,
                          keyboardType: TextInputType.emailAddress,
                          textAlign: TextAlign.start),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 20.0, right: 20.0, top: 20.0),
                      child: _buildTextFeild(
                          widgetIcon: Icon(
                            Icons.vpn_key,
                            size: 20,
                            color: colorStyle.primaryColor,
                          ),
                          controller: _confirm_passwordController,
                          onchange_func: (value) {
                            confirmPass = value;
                          },
                          hint: 'Confirm Password',
                          obscure: true,
                          keyboardType: TextInputType.emailAddress,
                          textAlign: TextAlign.start),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 20.0, right: 20.0, top: 15.0),
                      child: Align(
                          alignment: Alignment.centerRight,
                          child: Text(
                            "$output_txt",
                            style: TextStyle(
                              color: Colors.red,
                              fontSize: 12.0,
                            ),
                          )),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(
                          left: 20.0, right: 20.0, top: 40.0),
                      child: GestureDetector(
                        onTap: () {
                          if (_cliked_registerBTN) {
                          } else {
                            _submit_register_details();
                          }
                        },
                        child: Container(
                          height: 50.0,
                          width: double.infinity,
                          decoration: BoxDecoration(
                            borderRadius:
                                BorderRadius.all(Radius.circular(0.0)),
                            color: colorStyle.primaryColor,
                          ),
                          child: Center(
                            child: _cliked_registerBTN
                                ? CircularProgressIndicator(
                                    valueColor:
                                        new AlwaysStoppedAnimation<Color>(
                                            Colors.white),
                                  )
                                : Text(
                                    "Register",
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.w400,
                                        fontSize: 20.0,
                                        letterSpacing: 1.0),
                                  ),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 20.0,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 20.0, right: 20.0),
                      child: GestureDetector(
                        onTap: () {
                          if (_cliked_loginBTN) {
                          } else {
                            Navigator.of(context)
                                .pushReplacement(PageRouteBuilder(
                                    pageBuilder: (_, __, ___) => new login(
                                          themeBloc: _themeBloc,
                                        )));
                          }
                        },
                        child: Container(
                          height: 50.0,
                          width: double.infinity,
                          decoration: BoxDecoration(
                            borderRadius:
                                BorderRadius.all(Radius.circular(0.0)),
                            border: Border.all(
                              color: colorStyle.primaryColor,
                              width: 0.35,
                            ),
                          ),
                          child: Center(
                            child: _cliked_loginBTN
                                ? CircularProgressIndicator()
                                : Text(
                                    "Sign In",
                                    style: TextStyle(
                                        color: Colors.white,
                                        fontWeight: FontWeight.w400,
                                        fontSize: 17.5,
                                        letterSpacing: 1.9),
                                  ),
                          ),
                        ),
                      ),
                    ),
//                  Padding(
//                    padding: const EdgeInsets.only(left:20.0,right: 20.0,bottom: 15.0),
//                    child: Container(width: double.infinity,height: 0.15,color: colorStyle.primaryColor,),
//                  ),
//                  Text("Register",style: TextStyle(color: colorStyle.primaryColor,fontSize: 17.0,fontWeight: FontWeight.w800),),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Future<GetResultModel> GET_Meth() async {
  //   final response = await http.get(
  //     Uri.parse('https://jsonplaceholder.typicode.com/albums/1'),
  //     // Send authorization headers to the backend.
  //     headers: <String, String>{
  //       'Content-Type': 'application/json;charSet=UTF-8'
  //     },
  //   );
  //   final responseJson = jsonDecode(response.body);

  //   return GetResultModel.fromJson(responseJson);
  // }

  Future _GET_Meth(String url) async {
    final response = await http.get(
      Uri.parse(url),
      // Send authorization headers to the backend.
      headers: <String, String>{
        'Content-Type': 'application/json;charSet=UTF-8'
      },
    );
    return response.body;
  }

  _submit_register_details() {
    if (!RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(user.email)) {
      output_txt = "Invalid Email";
      _cliked_registerBTN = false;
    } else if (user.password != confirmPass) {
      output_txt = "Password does not match";
      _cliked_registerBTN = false;
    } else {
      setState(() {
        _cliked_registerBTN = true;
      });
      _GET_Meth("http://143.244.171.41:88/register?email=" +
              user.email +
              "&password=" +
              user.password)
          .then((value) => {
                if (value == "success")
                  {_reg_success_action()}
                else
                  {
                    setState(() {
                      output_txt = "Erro signup";
                      _cliked_registerBTN = false;
                    })
                  }
              });
    }
    setState(() {});
  }

  _submit_login_details() {
    if (!RegExp(
            r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
        .hasMatch(user.email)) {
      output_txt = "Invalid Email";
    } else {
      _GET_Meth("http://143.244.171.41:88/login?email=" +
              user.email +
              "&password=" +
              user.password)
          .then((value) => {
                if (value == "success")
                  {_login_success_action()}
                else
                  {
                    setState(() {
                      output_txt = "Invalid Email or Password";
                      _cliked_loginBTN = false;
                    })
                  }
              });
    }
    setState(() {});
  }

  _login_success_action() {
    setState(() {
      _cliked_loginBTN = false;
    });
    Navigator.of(context).pushReplacement(PageRouteBuilder(
        pageBuilder: (_, __, ___) => bottomNavBar(
              themeBloc: _themeBloc,
            )));
  }

  _reg_success_action() {
    setState(() {
      _cliked_registerBTN = false;
    });
    Navigator.of(context).pushReplacement(PageRouteBuilder(
        pageBuilder: (_, __, ___) => bottomNavBar(
              themeBloc: _themeBloc,
            )));
  }

  Widget _buildTextFeild({
    String hint,
    TextEditingController controller,
    onchange_func,
    TextInputType keyboardType,
    bool obscure,
    String icon,
    TextAlign textAlign,
    Widget widgetIcon,
  }) {
    return Column(
      children: <Widget>[
        Container(
          height: 53.5,
          decoration: BoxDecoration(
            color: Colors.black26,
//              color: Color(0xFF282E41),
            borderRadius: BorderRadius.all(Radius.circular(5.0)),
            border: Border.all(
              color: colorStyle.primaryColor,
              width: 0.15,
            ),
          ),
          child: Padding(
            padding: const EdgeInsets.only(left: 12.0, right: 12.0, top: 10.0),
            child: Theme(
              data: ThemeData(hintColor: Colors.transparent),
              child: Padding(
                padding: const EdgeInsets.only(left: 10.0),
                child: TextField(
                  style: new TextStyle(color: Colors.white),
                  textAlign: textAlign,
                  obscureText: obscure,
                  controller: controller,
                  onChanged: onchange_func,
                  keyboardType: keyboardType,
                  autocorrect: false,
                  autofocus: false,
                  decoration: InputDecoration(
                      border: InputBorder.none,
                      icon: Padding(
                        padding: const EdgeInsets.only(right: 10.0),
                        child: widgetIcon,
                      ),
                      contentPadding: EdgeInsets.all(0.0),
                      filled: true,
                      fillColor: Colors.transparent,
                      labelText: hint,
                      hintStyle: TextStyle(color: Colors.white),
                      labelStyle: TextStyle(
                        color: Colors.white70,
                      )),
                ),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
