import { Service } from '../service';
export declare function Autoregister(): <T extends typeof Service>(target: T) => T;
