package br.com.appmania;

/**
 * Created by PedroLucas on 3/9/16.
 */
public enum PDFBoxType {

    TRIM(1), ART(2), CROP(3), MEDIA(4), BLEED(5), BOUNDING(6);

    private final int type;

    PDFBoxType(int type) {
        this.type = type;
    }

    public int getType(){
        return type;
    }

}
