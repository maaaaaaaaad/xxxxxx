#include <string>
#include <vector>
#include <algorithm>

#define MAX_DIST 1e9

using namespace std;

vector<int> rocksVec;

int binarySearch(int distance, int n){
    int left = 0;
    int right = distance;
    
    int result = 0;
    while(left <= right){
        int mid = (left + right) / 2;
        
        int cnt = 0;
        int pos = 0;
        int minDist = MAX_DIST;
        for(int rock: rocksVec){
            if(pos + mid <= rock){
                cnt++;
                minDist = min(minDist, rock - pos);
                pos = rock;
            }
        }
        
        if(cnt >= rocksVec.size() - n){
            left = mid+1;
            result = max(result,minDist);
        }else{
            right = mid-1;
        }
    }
    return result;
}

int solution(int distance, vector<int> rocks, int n) {
    
    rocksVec = rocks;
    rocksVec.push_back(distance);
    sort(rocksVec.begin(),rocksVec.end());
    
    return binarySearch(distance,n);
}