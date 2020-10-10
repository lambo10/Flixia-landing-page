package com.example.vtuprocessor;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.ListPreference;
import android.util.Log;
import android.widget.Toast;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;
import androidx.preference.PreferenceFragmentCompat;

public class SettingsActivity extends AppCompatActivity {

//    public static  final String PREF_NETWORKS = "list_preference_1";
//    private ListPreference preferenceChangeListener;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.settings_activity);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.settings, new SettingsFragment())
                .commit();
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null) {
            actionBar.setDisplayHomeAsUpEnabled(true);
        }
//        preferenceChangeListener = new ListPreference(this);
//        Toast.makeText(getApplicationContext(), preferenceChangeListener.getValue(),
//                Toast.LENGTH_LONG).show();
    }

    public static class SettingsFragment extends PreferenceFragmentCompat {

        @Override
        public void onCreatePreferences(Bundle savedInstanceState, String rootKey) {
            setPreferencesFromResource(R.xml.root_preferences, rootKey);


        }
    }

//    @Override
//    public void onResume(){
//        super.onResume();
//        getSharedPreferences("networkTypes",0).registerOnSharedPreferenceChangeListener(preferenceChangeListener);
//    }
//    @Override
//    public void onPause(){
//        super.onPause();
//        getSharedPreferences("networkTypes",0).registerOnSharedPreferenceChangeListener(preferenceChangeListener);
//    }
}