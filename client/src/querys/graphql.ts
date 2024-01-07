import { gql } from "@apollo/client";

// RECORD
export const CREATE_RECORD = gql`
  mutation CreateRecord($record: NewRecordInput!) {
    createRecord(record: $record) {
      _id
      name
      description
      imageUrl
      price
      category
      status
      owner
      creator
      user {
        _id
        did
        name
        email
        description
        profileImage
        bannerImage
        role
      }
    }
  }
`;

export const GET_APPROVED_RECORDS = gql`
  query GetApprovedRecords {
    getApprovedRecords {
      _id
      name
      description
      imageUrl
      price
      category
      status
      owner
      creator
      user {
        _id
        name
        description
        profileImage
        bannerImage
        role
      }
    }
  }
`;

export const GET_PENDING_RECORDS = gql`
  query GetPendingRecords {
    getPendingRecords {
      _id
      name
      description
      imageUrl
      price
      category
      status
      owner
      creator
      user {
        _id
        name
        description
        profileImage
        bannerImage
        role
      }
    }
  }
`;

export const GET_RECORD = gql`
  query GetRecord($_id: ID!) {
    getRecord(_id: $_id) {
      _id
      name
      description
      imageUrl
      price
      category
      status
      owner
      creator
      user {
        _id
        name
        description
        profileImage
        bannerImage
        role
      }
    }
  }
`;

export const GET_OWNER_RECORDS = gql`
  query GetOwnerRecords($owner: String!) {
    getOwnerRecords(owner: $owner) {
      _id
      name
      description
      imageUrl
      price
      category
      status
      owner
      creator
      user {
        _id
        name
        description
        profileImage
        bannerImage
        role
      }
    }
  }
`;

export const APPROVE_RECORD = gql`
  mutation ApproveRecord($_id: ID!) {
    approveRecord(_id: $_id)
  }
`;

// USER
export const REGISTER_USER = gql`
  mutation RegisterUser($user: NewUserInput!) {
    registerUser(user: $user) {
      user {
        _id
        did
        name
        email
        description
        profileImage
        bannerImage
        role
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($user: ExistUserInput!) {
    loginUser(user: $user) {
      user {
        _id
        did
        name
        email
        description
        profileImage
        bannerImage
        role
      }
      token
    }
  }
`;

// PAYMENT
export const SEND_PAYMENT = gql`
  mutation SendPayment($detail: PaymentDetail!) {
    sendPayment(detail: $detail) {
      detail {
        _id
        cardName
        cardNumber
        expiryDate
        cvcNumber
        user {
          _id
          did
          name
          email
          role
        }
      }
    }
  }
`;
