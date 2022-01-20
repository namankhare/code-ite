/* eslint-disable */
const rTabs = (str) => str.trim().replace(/^ {4}/gm, "");

const ExampleCode = {
  default: rTabs(`// welcome to code-ite. Select language and start coding!`),
  cpp: rTabs(`#include <iostream>
using namespace std;
  
int main() {
  double num1, num2, product;
  num1= 12;
  num2= 15;
  product = num1 * num2;  

  cout << "Product = " << product;    
    
return 0;
}
  `),
  java: rTabs(`
  import java.util.*; 
  import java.io.*; 
  public class Main{

   public static void main(String[] args) {
        
      int num1 = 5, num2 = 15, sum;
      sum = num1 + num2;

      System.out.println("Sum of these numbers: "+sum);
   }
}`),
  javascript: rTabs(`
    console.log("qer")
  `),
  c: rTabs(`
  #include <stdio.h>
  int main() {    
  
      int number1=1, number2=2, sum;
  
      // calculating sum
      sum = number1 + number2;      
      
      printf("%d + %d = %d", number1, number2, sum);
      return 0;
  }
  
  `)
};

export default ExampleCode;
