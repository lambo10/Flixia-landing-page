import 'package:mas/screen/Bottom_Nav_Bar/custom_nav_bar.dart';
import 'package:mas/screen/home/home.dart';
import 'package:mas/screen/setting/setting.dart';
import 'package:mas/screen/setting/themes.dart';
import 'package:mas/screen/wallet/wallet.dart';
import 'package:flutter/material.dart';
import 'package:mas/component/style.dart';

class bottomNavBar extends StatefulWidget {
  ///
  /// Function themeBloc for get data theme from main.dart for double theme dark and white theme
  ///
  ThemeBloc themeBloc;
  bottomNavBar({this.themeBloc});

  _bottomNavBarState createState() => _bottomNavBarState(themeBloc);
}

class _bottomNavBarState extends State<bottomNavBar> {
  ThemeBloc _themeBloc;
  _bottomNavBarState(this._themeBloc);
  int currentIndex = 0;
  bool _color = true;
  Widget callPage(int current) {
    switch (current) {
      case 0:
        return new wallet();
        break;
      case 1:
        return new setting(themeBloc: _themeBloc);
        break;
      case 2:
        return new wallet();
        break;
      default:
        return new wallet();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: callPage(currentIndex),
      bottomNavigationBar: BottomNavigationDotBar(
          // Usar -> "BottomNavigationDotBar"
          color: Theme.of(context).hintColor,
          items: <BottomNavigationDotBarItem>[
            BottomNavigationDotBarItem(
                icon: Icons.account_balance_wallet,
                onTap: () {
                  setState(() {
                    currentIndex = 0;
                  });
                }),
            BottomNavigationDotBarItem(
                icon: Icons.settings,
                onTap: () {
                  setState(() {
                    currentIndex = 1;
                  });
                }),
            BottomNavigationDotBarItem(
                icon: Icons.verified_user,
                onTap: () {
                  setState(() {
                    currentIndex = 2;
                  });
                }),
          ]),
    );
  }
}
