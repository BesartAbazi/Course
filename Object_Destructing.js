Destructing:
                Arrays:
                               Example 1:
                                               let colors = ['blue','red','purple'];

                                               // Destructure here
                                               let [color1, color2, color3] = colors;

                                               console.log(color1, color2, color3);

                               Example 2:
                                               let [a, b, ...rest] = [10, 20, 30, 40, 50];
                                               console.log(a, b, rest);
                                               // Expected output: 10, 20, Array [30, 40, 50]

                Objects:
                               Example 1:
                                               let planets = { x: 'Saturn', y: 'Mars', z: 'Neptune' };

                                               // Destructure here
                                               const {x, y, z} = planets;

                                               console.log(x, y, z);

                               Example 2:
                                               const obj = { a: 1, b: { c: 2 }, d: { e: 100, f: 200 } };
                                               const {
                                                               a,
                                                               b: { c: cValue },
                                                               d: { e: eValue, f: fValue }
                                               } = obj;

                                               console.log(a, cValue, eValue, fValue)

                               Example 3:
                                               const numbers = [];
                                               const obj = { a: 100, b: 200 };
                                               ({ a: numbers[0], b: numbers[1] } = obj);

                                               console.log(numbers[0], numbers[1]);
                                               // Output: 100, 200

                
                Function Parameters:
                               let truck = {
                                               model: '1977 Mustang convertible',
                                               maker: 'Ford',
                                               city: 'Detroit',
                                               year: '1977',
                                               convertible: true
                               };
                               const printCarInfo = ({model, maker, city}) => {
                                               console.log(`The ${model}, or ${maker}, is in the city ${city}.`);
                               };
                               printCarInfo(truck);
                               // Prints: The 1977 Mustang convertible, or Ford, is in the city Detroit.
