package com.company;

public class Coordinate {
    private float x, y;
    private int quadrant;

    public Coordinate() {
        x = 0f;
        y = 0f;
        quadrant = 0;
    }

    public Coordinate(float a, float b) {
        x = a;
        y = b;
        detQuadrant();
    }

    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public Coordinate map(float initX, float initY, float width, float height, float left, float right, float down, float up) {
        float newX = left + initX * (right - left) / (width);
        float newY = down + initY * (up - down) / (height);
        Coordinate mapped = new Coordinate(newX, newY);
        return mapped;
    }

    public void detQuadrant() {
        if (x == 0 && y == 0) {
            quadrant = 0;
        }
        if (x > 0) {
            if (y > 0) {
                quadrant = 1;
            } else {
                quadrant = 4;
            }
        } else {
            if (y > 0) {
                quadrant = 2;
            } else {
                quadrant = 3;
            }
        }
    }

    public int getQuadrant() {
        return quadrant;
    }
}