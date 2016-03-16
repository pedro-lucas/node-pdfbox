package br.com.appmania;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class PDFPageImage {

    public static final String IMAGE_FORMAT_JPG = "jpg";
    public static final String IMAGE_FORMAT_PNG = "png";

    private BufferedImage image;

    public PDFPageImage(BufferedImage image) {
        this.image = image;
    }

    public PDFPageImage cropImage(Rectangle rect) {
        return new PDFPageImage(image.getSubimage(rect.x, rect.y, rect.width, rect.height));

    }

    public PDFPageImage fitImage(int width, int height) {

        int w = image.getWidth();
        int h = image.getHeight();

        float scale = Math.min((float)width / (float)w, (float)height / (float)h);

        int newWidth = (int)(w * scale);
        int newHeight = (int)(h * scale);

        BufferedImage resized = new BufferedImage(newWidth, newHeight, image.getType());
        Graphics2D g = resized.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.drawImage(image, 0, 0, newWidth, newHeight, 0, 0, w, h, null);
        g.dispose();

        return new PDFPageImage(resized);

    }

    public int getWidth() {
        return  image.getWidth();
    }

    public int getHeight() {
        return image.getHeight();
    }

    public void save(String path, String formatName) throws IOException {
        ImageIO.write(image, formatName, new File(path));
    }

    public void save(String path) throws IOException {

        String ext = getFileExtension(new File(path));

        if(ext.equals(PDFPageImage.IMAGE_FORMAT_PNG)) {
            ext = PDFPageImage.IMAGE_FORMAT_PNG;
        }else {
            ext = PDFPageImage.IMAGE_FORMAT_JPG;
        }

        this.save(path, ext);
    }

    public BufferedImage getImage() {
        return image;
    }

    private String getFileExtension(File file) {
        String name = file.getName();
        try {
            return name.substring(name.lastIndexOf(".") + 1);
        } catch (Exception e) {
            return "";
        }
    }

}
