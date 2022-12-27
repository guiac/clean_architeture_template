export interface UpdateAccount {
    handle: (update: UpdateAccount.Request) => Promise<UpdateAccount.Result>
}

export namespace UpdateAccount {
    export type Request = {
        identification: string
        name?: string
        lastName?: string
        birthDate?: Date
        tellphone?: string
        cellphone?: string
        streetAddress?: string
        numberAddress?: string
        districtAddress?: string
        cityAddress?: string
        stateAddress?: string
    }
    export type Result = boolean
}
