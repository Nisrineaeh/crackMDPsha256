import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class HackService {

    constructor(private httpService: HttpService) { }

    async recupChallenge() {
        const mdp = this.httpService.post('https://shallenge.onrender.com/challenges');
        const response = await lastValueFrom(mdp);
        // console.log(response)
        return response.data;
    }



    hashPassword(password: string, saltHex: string) {
        const saltBuffer = Buffer.from(saltHex, 'hex');
        return crypto
            .createHash('sha256')
            .update(Buffer.concat([saltBuffer, Buffer.from(password, 'utf-8')]))
            .digest('hex');
    }

   
    // bruteForce(hash, salt) {
    //     const alpha = 'abcdefghijklmnopqrstuvwxyz';
    //     let test = 0;

    //     for (let a = 0; a < alpha.length; a++) {
    //         for (let b = 0; b < alpha.length; b++) {
    //             for (let c = 0; c < alpha.length; c++) {
    //                 for (let d = 0; d < alpha.length; d++) {
    //                     for (let e = 0; e < alpha.length; e++) {
    //                         for (let f = 0; f < alpha.length; f++) {
    //                             const code = alpha[a] + alpha[b] + alpha[c] + alpha[d] + alpha[e] + alpha[f];
    //                             if (this.hashPassword(code, salt) === hash) {
    //                                 return code;
    //                             }
    //                             test++;
    //                             if (test % 1000000 === 0) {
    //                                 console.log(`Tentatives: ${test}`);
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return null;
    // }

    bruteForce(hash, salt) {
        const charset = 'abcdefghijklmnopqrstuvwxyz';
        const lengthCode = 6; 
        let arr = new Array(lengthCode).fill(0);
        let test = 0;

        while (arr[0] < charset.length) {
            let mdp = arr.map(i => charset[i]).join('');

            if (this.hashPassword(mdp, salt) === hash) {
                console.log('mot de passe trouvé :', mdp)
                return mdp;
            }

            for (let i = lengthCode - 1; i >= 0; i--) {
                if (arr[i] < charset.length - 1) {
                    arr[i]++;
                    break;
                } else {
                    if (i === 0) {
                        return null;
                    }
                    arr[i] = 0;
                }
            }

            test++;
            if (test % 1000000 === 0) {
                console.log(`Tentatives: ${test}`);
            }
        }
        return null;
    }


    async responseChallenge(id, password) {
        const answer = this.httpService.post(`https://shallenge.onrender.com/challenges/${id}/answer`, JSON.stringify(password) );
        const response = await lastValueFrom(answer);
        return response.data;

    }
}
