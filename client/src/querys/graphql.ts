import { gql } from "@apollo/client";

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
        name
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
