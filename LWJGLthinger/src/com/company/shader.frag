uniform vec2 viewportDimensions;
uniform float minX;
uniform float maxX;
uniform float minY;
uniform float maxY;
uniform float limit;
uniform float rMod;
uniform float rMult;
uniform float br;
float x;
float y;
vec2 c;
vec2 z;
float t;

vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main(){
    x = gl_FragCoord.x;
    y = gl_FragCoord.y;

    c = mix(vec2(minX, minY), vec2(maxX, maxY), gl_FragCoord.xy / viewportDimensions);
    z = c;

    float iterations = 0;
    for(int i = 0; i < int(limit); i++){
        t = 2.0 * z.x * z.y + c.y;
        z.x = z.x * z.x - z.y * z.y + c.x;
        z.y = t;

        if(z.x * z.x + z.y *z.y > 4){
            break;
        }

        iterations += 1.0;
    }
    float itRGB = iterations/limit;
    vec3 hsv = vec3(itRGB*rMult+rMod, 1.0, 1.0+br);
    vec3 rgb = hsv2rgb(hsv);
    gl_FragColor = vec4(rgb, 1);
}
