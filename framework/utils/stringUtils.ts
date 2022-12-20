
export namespace stringUtils {

    export const convertStringToPrice = (str: string): number => {
        return parseInt(str
            .replace(/\D/g, '')
            .replace(',', '')
        );
    };
}
