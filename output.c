#include <string>
#include <vector>
#include <algorithm>
using namespace std;
 
int solution(vector<int> A, vector<int> B) 
{
    sort(A.begin(), A.end());
    sort(B.begin(), B.end());
    int answer = 0;
    int A_Idx = A.size() - 1;
    int B_Idx = B.size() - 1;
    while (A_Idx >= 0)
    {
        int A_Score = A[A_Idx];
        int B_Score = B[B_Idx];
        if (A_Score < B_Score)
        {
            B_Idx--;
            answer++;
        }
        A_Idx--;
    }
    return answer;
}