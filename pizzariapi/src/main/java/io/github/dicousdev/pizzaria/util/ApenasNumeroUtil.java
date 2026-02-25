package io.github.dicousdev.pizzaria.util;

public class ApenasNumeroUtil {

    public static String manterApenasNumeros(String text) {

        if(text == null) {
            return "";
        }

        return text.replaceAll("[^0-9]", "");
    }
}
