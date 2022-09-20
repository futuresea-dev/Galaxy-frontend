export type SignInResponse = {
  accessToken: string
  expirationMinutes: number
}

export type SignInRequest = {
  username: string
  password: string
}

export type RefreshTokenResponse = {
  accessToken: string
  expirationMinutes: number
}

export type UserResponse = {
  userId: number
  firstName: string
  lastName: string
  companyEmail: string
  img: string
}

export type UserRecordProgressResponse = {
  meeting: {
    person: ProgressBarInfo[]
    investment: ProgressBarInfo[]
    property: ProgressBarInfo[]
    vehicle: ProgressBarInfo[]
    pension: ProgressBarInfo[]
    loan: ProgressBarInfo[]
    industry: ProgressBarInfo[]
  }
  openingRecord: ProgressBarInfo[]
}

export type OpeningRecordBoxData = {
  meeting: {
    person: {
      last: ProgressBarInfo
      current: ProgressBarInfo
    }
    investment: {
      last: ProgressBarInfo
      current: ProgressBarInfo
    }
    property: {
      last: ProgressBarInfo
      current: ProgressBarInfo
    }
    vehicle: {
      last: ProgressBarInfo
      current: ProgressBarInfo
    }
    pension: {
      last: ProgressBarInfo
      current: ProgressBarInfo
    }
    loan: {
      last: ProgressBarInfo
      current: ProgressBarInfo
    }
    industry: {
      last: ProgressBarInfo
      current: ProgressBarInfo
    }
  }
  openingRecord: {
    last: ProgressBarInfo
    current: ProgressBarInfo
  }
}

export type ProgressBarInfo = {
  year: number
  month: number
  recordsCount: number
  recordsGoal: number
}

export type ContactFindByNameResponse = {
  contacts: Contact[]
}

export type Contact = {
  firstName: string
  surname: string
  phone: string
  companyName: string
  companyNumber: string
  id: string
  title: string
  birthNumber: string
  street: string
  city: string
  zip: number
  email: string
  type: number
}

export type CountryFlagsResponse = {
  suggestions: CountryFlag[]
}

export type CountryFlag = {
  code: string
  flag: string
  name: string
}

export type LastRecord = {
  name: string
  date: string
  finished: boolean
  id: number
}

export type LastRecords = {
  person: LastRecord
  investment: LastRecord
  property: LastRecord
  vehicle: LastRecord
  pension: LastRecord
  loan: LastRecord
  industry: LastRecord
}
