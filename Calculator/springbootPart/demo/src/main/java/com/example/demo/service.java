package com.example.demo;
import org.springframework.stereotype.Service;

import static java.lang.Character.isAlphabetic;
import static java.lang.Double.parseDouble;

@Service
public class service {

    //binary operations
    public String getResult(String exp) {
        String num1="",num2="";
        String operation="";
        double n1=0,n2=0;
        int f=1;
        for (int i = 0; i < exp.length(); i++) {
            if(exp.charAt(i) == '+' || exp.charAt(i) == '-'|| exp.charAt(i) == '/'||exp.charAt(i) == 'x'){
                operation = String.valueOf(exp.charAt(i));
                f=2;
                continue;
            }
            if(f==1)
                num1 += exp.charAt(i);
            else
                num2 += exp.charAt(i);
        }
        if(num1!="")
            n1 = parseDouble(num1);
        if(num2!="")
            n2 = parseDouble(num2);
        double r = 0;
        switch (operation){
            case "+":
                r = n1 + n2;
                break;
            case "-":
                r = n1 - n2;
                break;
            case "x":
                r = n1 * n2;
                break;
            case "/":
                if(n2 == 0) {
                    return null;
                }
                r = n1 / n2;
                break;
            default:return null;
        }
        return String.valueOf(r);

    }

    //unary
    public String getValue(String exp) {
        String num1="",operation="";
        double r = 0,n1=0;
        for (int i = 0; i < exp.length() ; i++) {
            if(isAlphabetic(exp.charAt(i))){
                operation += exp.charAt(i);
            }
            else
                num1+=exp.charAt(i);
        }
        if(num1!="")
             n1 = parseDouble(num1);

        switch (operation){
            case "root":
                if(n1<0)
                    return null;
                r = Math.sqrt(n1) ;
                break;
            case "square":
                r = n1 * n1  ;
                break;
            case "mod":
                r = n1/100.0  ;
                break;
            case "reciprocal":
                if(n1 == 0) {
                    return null;
                }
                r = 1.0/n1 ;
                break;
            default:return null;
        }

        return String.valueOf(r);
    }

}
