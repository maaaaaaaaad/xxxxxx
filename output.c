#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

int solution(long long num) {
    int answer = 0;
    int count = 0;
    while(num != 1) {
        if(count < 499) {
            if(num % 2 == 0) {
                num /= 2;
            } else {
                num = num * 3 + 1;
            }
            count += 1;
        } else {
            return -1;
        }
    }
    return count;
}