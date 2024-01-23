#include <stdio.h>

int main() {
    char *s1 = "aaaabbbcccccddddddddd";
    char s2[30] = {0,};
    int length;
    char ch[2] = {0,};

    ch[0] = s1[0];

    int count = 0;
    char countStr[10] = {0,};
    for (int i = 1; i <= length; i++) 
    {
        if(ch[0] == s1[i])
        {
            count++;
        }
        else 
        {
            stract(s2, ch);
            sprintf(countStr, "%d", count);
            stract(s2, countStr);

            ch[0] = s1[i];
            count = 1;
        }
    }
    return 0;
}