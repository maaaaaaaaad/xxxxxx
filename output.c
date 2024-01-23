#include <stdio.h>

void main() 
{
	int i, j, count = 1;
	long sum = 0;

	printf("%d\t", 1);

	for (i = 1; i <= 1000; i++) {
		for (j = 2; j < i; j++) {
			if ((i % j) == 0)
				break;
		}

		if (i == j) {
			printf("%d\t", i);
			count++;

			if ((count % 8) == 0)
				printf("\n");
		}
	}
	printf(count);
}