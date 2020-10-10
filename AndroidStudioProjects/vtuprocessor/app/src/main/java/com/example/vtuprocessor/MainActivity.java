package com.example.vtuprocessor;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.snackbar.Snackbar;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.telephony.SmsManager;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {
    private TextView txtShowTextResult;
    private ScrollView outputScrollView;
    private TextView transactionOutput;
    public String server_address = "https://diligentmart.com";
    private int serviceStartCount = 0;
    private final int REQUEST_PERMISSION_CALL_PHONE=1;
    private  final  int REQUEST_PERMISSION_SEND_SMS=1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        FloatingActionButton fab = findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(serviceStartCount <= 0){
                    Snackbar.make(view, "Started Service", Snackbar.LENGTH_LONG)
                            .setAction("Action", null).show();
                }else {
                    Snackbar.make(view, "Re-Started Service", Snackbar.LENGTH_LONG)
                            .setAction("Action", null).show();
                }
                if (ContextCompat.checkSelfPermission(getApplicationContext(),
                        Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED) {
                    requestSEND_SMS_permission();
                }
                if (ContextCompat.checkSelfPermission(getApplicationContext(),
                        Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
                    requestCall_Phone_permission();
                }
                start();
                serviceStartCount++;
            }
        });


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            Intent intent = new Intent(MainActivity.this, SettingsActivity.class);
            startActivity(intent);
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    private void requestSEND_SMS_permission(){
        if(ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.SEND_SMS)){
            new AlertDialog.Builder(this)
                    .setTitle("Permission Needed")
                    .setMessage("This permission is needed to send SMS to the network provider")
                    .setPositiveButton("ok", new DialogInterface.OnClickListener(){
                        @Override
                        public void onClick(DialogInterface dialog, int which){
                            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.SEND_SMS},REQUEST_PERMISSION_SEND_SMS);
                        }
                    })
                    .setNegativeButton("cancel",new DialogInterface.OnClickListener(){
                        @Override
                        public void onClick(DialogInterface dialog, int which){
                            dialog.dismiss();
                        }
                    })
                    .create().show();

        }else{
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.SEND_SMS},REQUEST_PERMISSION_SEND_SMS);
        }

    }


    private void requestCall_Phone_permission(){
        if(ActivityCompat.shouldShowRequestPermissionRationale(this, Manifest.permission.CALL_PHONE)){
            new AlertDialog.Builder(this)
                    .setTitle("Permission Needed")
                    .setMessage("This permission is needed to send USSD requests to the network provider")
                    .setPositiveButton("ok", new DialogInterface.OnClickListener(){
                        @Override
                        public void onClick(DialogInterface dialog, int which){
                            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CALL_PHONE},REQUEST_PERMISSION_CALL_PHONE);
                        }
                    })
                    .setNegativeButton("cancel",new DialogInterface.OnClickListener(){
                        @Override
                        public void onClick(DialogInterface dialog, int which){
                            dialog.dismiss();
                        }
                    })
                    .create().show();

        }else{
            ActivityCompat.requestPermissions(MainActivity.this, new String[]{Manifest.permission.CALL_PHONE},REQUEST_PERMISSION_CALL_PHONE);
        }

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults){
        if(requestCode == REQUEST_PERMISSION_CALL_PHONE){
            if(grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED){
                Toast.makeText(this,"Permission Granted",Toast.LENGTH_SHORT).show();
            }else{
                Toast.makeText(this,"Permission Denied",Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void sendUssd(String ussdString, final String id){
        txtShowTextResult = findViewById(R.id.outputDisplay);
        outputScrollView = findViewById(R.id.outputScrollview);

        if (ContextCompat.checkSelfPermission(getApplicationContext(),
                Manifest.permission.CALL_PHONE) != PackageManager.PERMISSION_GRANTED) {
            requestCall_Phone_permission();
        }



        TelephonyManager telephonyManager = (TelephonyManager)getSystemService(Context.TELEPHONY_SERVICE);
        Handler handler = new Handler(Looper.getMainLooper()) {
            @Override
            public void handleMessage(Message message) {
                txtShowTextResult.append(message.toString()+"\n");
                outputScrollView.post(new Runnable() {

                    @Override
                    public void run() {
                        outputScrollView.fullScroll(View.FOCUS_DOWN);
                    }
                });
            }
        };
        TelephonyManager.UssdResponseCallback callback = new TelephonyManager.UssdResponseCallback() {
            @Override
            public void onReceiveUssdResponse(TelephonyManager telephonyManager, String request, CharSequence response) {
                super.onReceiveUssdResponse(telephonyManager, request, response);
                txtShowTextResult.append("Success with response : " + response+"\n");
                outputScrollView.post(new Runnable() {

                    @Override
                    public void run() {
                        outputScrollView.fullScroll(View.FOCUS_DOWN);
                    }
                });
                confirm_successfull_transaction(id);
                start();
            }

            @Override
            public void onReceiveUssdResponseFailed(TelephonyManager telephonyManager, String request, int failureCode) {
                super.onReceiveUssdResponseFailed(telephonyManager, request, failureCode);
                txtShowTextResult.append("failed with code " + Integer.toString(failureCode)+"\n");
                outputScrollView.post(new Runnable() {

                    @Override
                    public void run() {
                        outputScrollView.fullScroll(View.FOCUS_DOWN);
                    }
                });
                start();
            }
        };

        try {
            txtShowTextResult.append("Sending ussd request"+"\n");
            outputScrollView.post(new Runnable() {

                @Override
                public void run() {
                    outputScrollView.fullScroll(View.FOCUS_DOWN);
                }
            });
            telephonyManager.sendUssdRequest(ussdString,
                    callback,
                    handler);
        }catch (Exception e){


            String msg= e.getMessage();
            Log.e("DEBUG",e.toString());
            e.printStackTrace();
        }


    }


    public void sendSMS(String phoneNo, String msg) {
        if (ContextCompat.checkSelfPermission(getApplicationContext(),
                Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED) {
            requestSEND_SMS_permission();
        }
        try {

            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(phoneNo, null, msg, null, null);
            Toast.makeText(getApplicationContext(), "Message Sent",
                    Toast.LENGTH_LONG).show();
        } catch (Exception ex) {
            Toast.makeText(getApplicationContext(),ex.getMessage().toString(),
                    Toast.LENGTH_LONG).show();
            ex.printStackTrace();
        }
        sendSMS2(phoneNo,"YES");
        start();
    }

    public void sendSMS2(String phoneNo, String msg) {
        if (ContextCompat.checkSelfPermission(getApplicationContext(),
                Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED) {
            requestSEND_SMS_permission();
        }
        try {

            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(phoneNo, null, msg, null, null);
            Toast.makeText(getApplicationContext(), "Message Sent",
                    Toast.LENGTH_LONG).show();
        } catch (Exception ex) {
            Toast.makeText(getApplicationContext(),ex.getMessage().toString(),
                    Toast.LENGTH_LONG).show();
            ex.printStackTrace();
        }
        start();
    }


    private void start(){

        final Handler handler = new Handler();
        Timer timer = new Timer();
        TimerTask doTask = new TimerTask() {
            @Override
            public void run() {
                handler.post(new Runnable() {
                    @SuppressWarnings("unchecked")
                    public void run() {
                        try {
                            get_vtu_requests();
                        }
                        catch (Exception e) {
                            // TODO Auto-generated catch block
                        }
                    }
                });
            }
        };
        timer.schedule(doTask,1000);
    }


    public  void purchase(String network,String serviceType, String msg_ussd, String id){
        String dialCode = "";
        if((serviceType.equals("DATA") && network.equals("MTN")) || (serviceType.equals("DATA") && network.equals("AIRTEL")) ||  (serviceType.equals("DATA") && network.equals("9MOBILE")) || (serviceType.equals("DATA") && network.equals("GLO"))){
            sendUssd(msg_ussd,id);
        }
//        else if(serviceType.equals("DATA") && network.equals("MTN") ){
//            sendSMS("131",msg_ussd);
//        }
        else if(serviceType.equals("AIRTIME")){
            if(network.equals("AIRTEL")){
                dialCode = "432";
                sendSMS(dialCode,msg_ussd);
            }else if(network.equals("MTN")){
                dialCode = "777";
                sendSMS(dialCode,msg_ussd);
            }else if(network.equals("GLO")){
                sendUssd(msg_ussd,id);
            }else if(network.equals("9MOBILE")){
                sendUssd(msg_ussd,id);
            }

        }

    }


    public void get_vtu_requests(){
        txtShowTextResult = findViewById(R.id.outputDisplay);
        outputScrollView = findViewById(R.id.outputScrollview);
        transactionOutput = findViewById(R.id.transactionOutput);
         txtShowTextResult.append("Pulling Transaction requests \n");
        outputScrollView.post(new Runnable() {

            @Override
            public void run() {
                outputScrollView.fullScroll(View.FOCUS_DOWN);
            }
        });
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        final String url = server_address+"/api/getDataPurchaseRequest.php?network=MTN&key=uraj1i2568";

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,url,null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {
                try {
                    StringBuilder formattedResult = new StringBuilder();
                    JSONArray responseJSONArray = response.getJSONArray("results");
                    if(responseJSONArray.length() <= 0){
                        transactionOutput.setText("");
                         formattedResult.append("Data and Airtime request bucket empty \n");
                        outputScrollView.post(new Runnable() {

                            @Override
                            public void run() {
                                outputScrollView.fullScroll(View.FOCUS_DOWN);
                            }
                        });
                        start();
                    }
                    for (int i = 0; i < responseJSONArray.length(); i++) {
                        transactionOutput.setText("Processing Transaction - number - "+ responseJSONArray.getJSONObject(i).get("phone")+"\n");
                        formattedResult.append("Purchasing " + responseJSONArray.getJSONObject(i).get("type") + " for " + "=> \t" + responseJSONArray.getJSONObject(i).get("phone")+"\n");
                        formattedResult.append("Request date => " + responseJSONArray.getJSONObject(i).get("date")+"\n");
                        outputScrollView.post(new Runnable() {

                            @Override
                            public void run() {
                                outputScrollView.fullScroll(View.FOCUS_DOWN);
                            }
                        });
                        purchase(responseJSONArray.getJSONObject(i).get("network").toString(),responseJSONArray.getJSONObject(i).get("type").toString(),responseJSONArray.getJSONObject(i).get("sms_usd_string").toString(),responseJSONArray.getJSONObject(i).get("id").toString());
                    }
                    txtShowTextResult.append(formattedResult+"\n");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
//
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                txtShowTextResult.append("Erro: An Error occured while pulling requests \n");
                outputScrollView.post(new Runnable() {

                    @Override
                    public void run() {
                        outputScrollView.fullScroll(View.FOCUS_DOWN);
                    }
                });
                start();
            }
        });
        requestQueue.add(jsonObjectRequest);
    }

    public void confirm_successfull_transaction(String id){
        txtShowTextResult = findViewById(R.id.outputDisplay);
        outputScrollView = findViewById(R.id.outputScrollview);
        transactionOutput = findViewById(R.id.transactionOutput);

        txtShowTextResult.append("Confirming transaction \n");
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        final String url = server_address+"/api/process_transaction_confirmation.php?id="+id;

        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,url,null, new Response.Listener<JSONObject>() {

            @Override
            public void onResponse(JSONObject response) {
                try {
                    StringBuilder formattedResult = new StringBuilder();
                    JSONArray responseJSONArray = response.getJSONArray("results");

                    for (int i = 0; i < responseJSONArray.length(); i++) {
                        formattedResult.append("Transaction confirmation " + responseJSONArray.getJSONObject(i).get("status"));
                    }
                    transactionOutput.append(formattedResult+"\n");

                } catch (JSONException e) {
                    e.printStackTrace();
                }
//
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                txtShowTextResult.append("Erro: An Error occured while confirming transaction \n");
                outputScrollView.post(new Runnable() {

                    @Override
                    public void run() {
                        outputScrollView.fullScroll(View.FOCUS_DOWN);
                    }
                });
                start();
            }
        });
        requestQueue.add(jsonObjectRequest);
    }
}
