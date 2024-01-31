#include <stdio.h>
#include <stdlib.h>
void infer()
{
    int N;
    scanf("%d", &N);
    int i;
    int *arr;
    arr = (int*)malloc(sizeof(int)*N);
    for (i = 0;i < N;i++)
    {
        scanf("%d", &arr[i]);
    }
    if ((arr[0] * arr[2]) == (arr[1] * arr[1]))
        printf("%d", arr[N - 1] * (arr[1] / arr[0]));
    else
        printf("%d", arr[N - 1] + (arr[1] - arr[0]));
}
int main()
{
    infer();
}