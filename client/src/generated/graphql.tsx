import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  users: Array<User>;
  myInfo: Scalars['String'];
  colleges?: Maybe<Array<College>>;
  college?: Maybe<College>;
  collegeStudents: Array<Student>;
  students?: Maybe<Array<StudentItem>>;
  student?: Maybe<Student>;
  branches?: Maybe<Array<BranchItem>>;
  branch?: Maybe<Branch>;
  branchStudents: Array<Student>;
};

export type QueryCollegeArgs = {
  collegeId: Scalars['ObjectId'];
};

export type QueryCollegeStudentsArgs = {
  collegeId: Scalars['ObjectId'];
};

export type QueryStudentArgs = {
  studentId: Scalars['ObjectId'];
};

export type QueryBranchArgs = {
  branchId: Scalars['ObjectId'];
};

export type QueryBranchStudentsArgs = {
  branchId: Scalars['ObjectId'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  username: Scalars['String'];
  tokenVersion: Scalars['Float'];
};

export type College = {
  __typename?: 'College';
  _id: Scalars['ID'];
  name: Scalars['String'];
  createdBy: Scalars['ID'];
};

export type Student = {
  __typename?: 'Student';
  _id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  collegeId: Scalars['ID'];
};

export type StudentItem = {
  __typename?: 'StudentItem';
  _id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  collegeId: Scalars['ID'];
  college: College;
};

export type BranchItem = {
  __typename?: 'BranchItem';
  _id: Scalars['ID'];
  name: Scalars['String'];
  collegeId: Scalars['ID'];
  students: Array<Scalars['ID']>;
  numberOfStudents: Scalars['Float'];
  college: College;
};

export type Branch = {
  __typename?: 'Branch';
  _id: Scalars['ID'];
  name: Scalars['String'];
  collegeId: Scalars['ID'];
  students: Array<Scalars['ID']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  login: LoginResponse;
  register: Scalars['Boolean'];
  createCollege: College;
  updateCollege: College;
  deleteCollege: College;
  createStudent: Student;
  updateStudent: Student;
  deleteStudent: Student;
  createBranch: Branch;
  updateBranch: Branch;
  deleteBranch: Branch;
  assignStudent: Scalars['Boolean'];
};

export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['ObjectId'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationCreateCollegeArgs = {
  college: CollegeDto;
};

export type MutationUpdateCollegeArgs = {
  college: CollegeDto;
  collegeId: Scalars['ObjectId'];
};

export type MutationDeleteCollegeArgs = {
  collegeId: Scalars['ObjectId'];
};

export type MutationCreateStudentArgs = {
  collegeId: Scalars['ObjectId'];
  student: StudentDto;
};

export type MutationUpdateStudentArgs = {
  student: StudentDto;
  studentId: Scalars['ObjectId'];
};

export type MutationDeleteStudentArgs = {
  studentId: Scalars['ObjectId'];
};

export type MutationCreateBranchArgs = {
  collegeId: Scalars['ObjectId'];
  branch: BranchDto;
};

export type MutationUpdateBranchArgs = {
  branch: BranchDto;
  branchId: Scalars['ObjectId'];
};

export type MutationDeleteBranchArgs = {
  branchId: Scalars['ObjectId'];
};

export type MutationAssignStudentArgs = {
  assignStudent: AssignStudentDto;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type CollegeDto = {
  name: Scalars['String'];
};

export type StudentDto = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type BranchDto = {
  name: Scalars['String'];
};

export type AssignStudentDto = {
  studentId: Scalars['ID'];
  branchId: Scalars['ID'];
};

export type AssignStudentMutationVariables = Exact<{
  assignStudent: AssignStudentDto;
}>;

export type AssignStudentMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'assignStudent'
>;

export type BranchStudentsQueryVariables = Exact<{
  branchId: Scalars['ObjectId'];
}>;

export type BranchStudentsQuery = { __typename?: 'Query' } & {
  branchStudents: Array<
    { __typename?: 'Student' } & Pick<
      Student,
      '_id' | 'collegeId' | 'firstName' | 'lastName'
    >
  >;
};

export type BranchesQueryVariables = Exact<{ [key: string]: never }>;

export type BranchesQuery = { __typename?: 'Query' } & {
  branches?: Maybe<
    Array<
      { __typename?: 'BranchItem' } & Pick<
        BranchItem,
        '_id' | 'name' | 'collegeId' | 'numberOfStudents'
      > & {
          college: { __typename?: 'College' } & Pick<College, '_id' | 'name'>;
        }
    >
  >;
};

export type CollegeStudentsQueryVariables = Exact<{
  collegeId: Scalars['ObjectId'];
}>;

export type CollegeStudentsQuery = { __typename?: 'Query' } & {
  collegeStudents: Array<
    { __typename?: 'Student' } & Pick<
      Student,
      '_id' | 'collegeId' | 'firstName' | 'lastName'
    >
  >;
};

export type CollegesQueryVariables = Exact<{ [key: string]: never }>;

export type CollegesQuery = { __typename?: 'Query' } & {
  colleges?: Maybe<
    Array<
      { __typename?: 'College' } & Pick<College, '_id' | 'name' | 'createdBy'>
    >
  >;
};

export type CreateBranchMutationVariables = Exact<{
  branch: BranchDto;
  collegeId: Scalars['ObjectId'];
}>;

export type CreateBranchMutation = { __typename?: 'Mutation' } & {
  createBranch: { __typename?: 'Branch' } & Pick<
    Branch,
    '_id' | 'name' | 'collegeId'
  >;
};

export type CreateCollegeMutationVariables = Exact<{
  college: CollegeDto;
}>;

export type CreateCollegeMutation = { __typename?: 'Mutation' } & {
  createCollege: { __typename?: 'College' } & Pick<
    College,
    '_id' | 'name' | 'createdBy'
  >;
};

export type CreateStudentMutationVariables = Exact<{
  student: StudentDto;
  collegeId: Scalars['ObjectId'];
}>;

export type CreateStudentMutation = { __typename?: 'Mutation' } & {
  createStudent: { __typename?: 'Student' } & Pick<
    Student,
    '_id' | 'firstName' | 'lastName' | 'collegeId'
  >;
};

export type HelloQueryVariables = Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: 'Query' } & Pick<Query, 'hello'>;

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'LoginResponse' } & Pick<LoginResponse, 'accessToken'>;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type MyInfoQueryVariables = Exact<{ [key: string]: never }>;

export type MyInfoQuery = { __typename?: 'Query' } & Pick<Query, 'myInfo'>;

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'register'
>;

export type StudentsQueryVariables = Exact<{ [key: string]: never }>;

export type StudentsQuery = { __typename?: 'Query' } & {
  students?: Maybe<
    Array<
      { __typename?: 'StudentItem' } & Pick<
        StudentItem,
        '_id' | 'firstName' | 'lastName'
      > & {
          college: { __typename?: 'College' } & Pick<College, '_id' | 'name'>;
        }
    >
  >;
};

export const AssignStudentDocument = gql`
  mutation AssignStudent($assignStudent: AssignStudentDTO!) {
    assignStudent(assignStudent: $assignStudent)
  }
`;
export type AssignStudentMutationFn = Apollo.MutationFunction<
  AssignStudentMutation,
  AssignStudentMutationVariables
>;

/**
 * __useAssignStudentMutation__
 *
 * To run a mutation, you first call `useAssignStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignStudentMutation, { data, loading, error }] = useAssignStudentMutation({
 *   variables: {
 *      assignStudent: // value for 'assignStudent'
 *   },
 * });
 */
export function useAssignStudentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AssignStudentMutation,
    AssignStudentMutationVariables
  >
) {
  return Apollo.useMutation<
    AssignStudentMutation,
    AssignStudentMutationVariables
  >(AssignStudentDocument, baseOptions);
}
export type AssignStudentMutationHookResult = ReturnType<
  typeof useAssignStudentMutation
>;
export type AssignStudentMutationResult = Apollo.MutationResult<AssignStudentMutation>;
export type AssignStudentMutationOptions = Apollo.BaseMutationOptions<
  AssignStudentMutation,
  AssignStudentMutationVariables
>;
export const BranchStudentsDocument = gql`
  query BranchStudents($branchId: ObjectId!) {
    branchStudents(branchId: $branchId) {
      _id
      collegeId
      firstName
      lastName
    }
  }
`;

/**
 * __useBranchStudentsQuery__
 *
 * To run a query within a React component, call `useBranchStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBranchStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBranchStudentsQuery({
 *   variables: {
 *      branchId: // value for 'branchId'
 *   },
 * });
 */
export function useBranchStudentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    BranchStudentsQuery,
    BranchStudentsQueryVariables
  >
) {
  return Apollo.useQuery<BranchStudentsQuery, BranchStudentsQueryVariables>(
    BranchStudentsDocument,
    baseOptions
  );
}
export function useBranchStudentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BranchStudentsQuery,
    BranchStudentsQueryVariables
  >
) {
  return Apollo.useLazyQuery<BranchStudentsQuery, BranchStudentsQueryVariables>(
    BranchStudentsDocument,
    baseOptions
  );
}
export type BranchStudentsQueryHookResult = ReturnType<
  typeof useBranchStudentsQuery
>;
export type BranchStudentsLazyQueryHookResult = ReturnType<
  typeof useBranchStudentsLazyQuery
>;
export type BranchStudentsQueryResult = Apollo.QueryResult<
  BranchStudentsQuery,
  BranchStudentsQueryVariables
>;
export const BranchesDocument = gql`
  query Branches {
    branches {
      _id
      name
      collegeId
      numberOfStudents
      college {
        _id
        name
      }
    }
  }
`;

/**
 * __useBranchesQuery__
 *
 * To run a query within a React component, call `useBranchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBranchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBranchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useBranchesQuery(
  baseOptions?: Apollo.QueryHookOptions<BranchesQuery, BranchesQueryVariables>
) {
  return Apollo.useQuery<BranchesQuery, BranchesQueryVariables>(
    BranchesDocument,
    baseOptions
  );
}
export function useBranchesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BranchesQuery,
    BranchesQueryVariables
  >
) {
  return Apollo.useLazyQuery<BranchesQuery, BranchesQueryVariables>(
    BranchesDocument,
    baseOptions
  );
}
export type BranchesQueryHookResult = ReturnType<typeof useBranchesQuery>;
export type BranchesLazyQueryHookResult = ReturnType<
  typeof useBranchesLazyQuery
>;
export type BranchesQueryResult = Apollo.QueryResult<
  BranchesQuery,
  BranchesQueryVariables
>;
export const CollegeStudentsDocument = gql`
  query CollegeStudents($collegeId: ObjectId!) {
    collegeStudents(collegeId: $collegeId) {
      _id
      collegeId
      firstName
      lastName
    }
  }
`;

/**
 * __useCollegeStudentsQuery__
 *
 * To run a query within a React component, call `useCollegeStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollegeStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollegeStudentsQuery({
 *   variables: {
 *      collegeId: // value for 'collegeId'
 *   },
 * });
 */
export function useCollegeStudentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    CollegeStudentsQuery,
    CollegeStudentsQueryVariables
  >
) {
  return Apollo.useQuery<CollegeStudentsQuery, CollegeStudentsQueryVariables>(
    CollegeStudentsDocument,
    baseOptions
  );
}
export function useCollegeStudentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CollegeStudentsQuery,
    CollegeStudentsQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    CollegeStudentsQuery,
    CollegeStudentsQueryVariables
  >(CollegeStudentsDocument, baseOptions);
}
export type CollegeStudentsQueryHookResult = ReturnType<
  typeof useCollegeStudentsQuery
>;
export type CollegeStudentsLazyQueryHookResult = ReturnType<
  typeof useCollegeStudentsLazyQuery
>;
export type CollegeStudentsQueryResult = Apollo.QueryResult<
  CollegeStudentsQuery,
  CollegeStudentsQueryVariables
>;
export const CollegesDocument = gql`
  query Colleges {
    colleges {
      _id
      name
      createdBy
    }
  }
`;

/**
 * __useCollegesQuery__
 *
 * To run a query within a React component, call `useCollegesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollegesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollegesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCollegesQuery(
  baseOptions?: Apollo.QueryHookOptions<CollegesQuery, CollegesQueryVariables>
) {
  return Apollo.useQuery<CollegesQuery, CollegesQueryVariables>(
    CollegesDocument,
    baseOptions
  );
}
export function useCollegesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CollegesQuery,
    CollegesQueryVariables
  >
) {
  return Apollo.useLazyQuery<CollegesQuery, CollegesQueryVariables>(
    CollegesDocument,
    baseOptions
  );
}
export type CollegesQueryHookResult = ReturnType<typeof useCollegesQuery>;
export type CollegesLazyQueryHookResult = ReturnType<
  typeof useCollegesLazyQuery
>;
export type CollegesQueryResult = Apollo.QueryResult<
  CollegesQuery,
  CollegesQueryVariables
>;
export const CreateBranchDocument = gql`
  mutation CreateBranch($branch: BranchDTO!, $collegeId: ObjectId!) {
    createBranch(branch: $branch, collegeId: $collegeId) {
      _id
      name
      collegeId
    }
  }
`;
export type CreateBranchMutationFn = Apollo.MutationFunction<
  CreateBranchMutation,
  CreateBranchMutationVariables
>;

/**
 * __useCreateBranchMutation__
 *
 * To run a mutation, you first call `useCreateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBranchMutation, { data, loading, error }] = useCreateBranchMutation({
 *   variables: {
 *      branch: // value for 'branch'
 *      collegeId: // value for 'collegeId'
 *   },
 * });
 */
export function useCreateBranchMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBranchMutation,
    CreateBranchMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateBranchMutation,
    CreateBranchMutationVariables
  >(CreateBranchDocument, baseOptions);
}
export type CreateBranchMutationHookResult = ReturnType<
  typeof useCreateBranchMutation
>;
export type CreateBranchMutationResult = Apollo.MutationResult<CreateBranchMutation>;
export type CreateBranchMutationOptions = Apollo.BaseMutationOptions<
  CreateBranchMutation,
  CreateBranchMutationVariables
>;
export const CreateCollegeDocument = gql`
  mutation CreateCollege($college: CollegeDTO!) {
    createCollege(college: $college) {
      _id
      name
      createdBy
    }
  }
`;
export type CreateCollegeMutationFn = Apollo.MutationFunction<
  CreateCollegeMutation,
  CreateCollegeMutationVariables
>;

/**
 * __useCreateCollegeMutation__
 *
 * To run a mutation, you first call `useCreateCollegeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollegeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollegeMutation, { data, loading, error }] = useCreateCollegeMutation({
 *   variables: {
 *      college: // value for 'college'
 *   },
 * });
 */
export function useCreateCollegeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCollegeMutation,
    CreateCollegeMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateCollegeMutation,
    CreateCollegeMutationVariables
  >(CreateCollegeDocument, baseOptions);
}
export type CreateCollegeMutationHookResult = ReturnType<
  typeof useCreateCollegeMutation
>;
export type CreateCollegeMutationResult = Apollo.MutationResult<CreateCollegeMutation>;
export type CreateCollegeMutationOptions = Apollo.BaseMutationOptions<
  CreateCollegeMutation,
  CreateCollegeMutationVariables
>;
export const CreateStudentDocument = gql`
  mutation CreateStudent($student: StudentDTO!, $collegeId: ObjectId!) {
    createStudent(student: $student, collegeId: $collegeId) {
      _id
      firstName
      lastName
      collegeId
    }
  }
`;
export type CreateStudentMutationFn = Apollo.MutationFunction<
  CreateStudentMutation,
  CreateStudentMutationVariables
>;

/**
 * __useCreateStudentMutation__
 *
 * To run a mutation, you first call `useCreateStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStudentMutation, { data, loading, error }] = useCreateStudentMutation({
 *   variables: {
 *      student: // value for 'student'
 *      collegeId: // value for 'collegeId'
 *   },
 * });
 */
export function useCreateStudentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateStudentMutation,
    CreateStudentMutationVariables
  >
) {
  return Apollo.useMutation<
    CreateStudentMutation,
    CreateStudentMutationVariables
  >(CreateStudentDocument, baseOptions);
}
export type CreateStudentMutationHookResult = ReturnType<
  typeof useCreateStudentMutation
>;
export type CreateStudentMutationResult = Apollo.MutationResult<CreateStudentMutation>;
export type CreateStudentMutationOptions = Apollo.BaseMutationOptions<
  CreateStudentMutation,
  CreateStudentMutationVariables
>;
export const HelloDocument = gql`
  query Hello {
    hello
  }
`;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  return Apollo.useQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export function useHelloLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<
  HelloQuery,
  HelloQueryVariables
>;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const MyInfoDocument = gql`
  query MyInfo {
    myInfo
  }
`;

/**
 * __useMyInfoQuery__
 *
 * To run a query within a React component, call `useMyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<MyInfoQuery, MyInfoQueryVariables>
) {
  return Apollo.useQuery<MyInfoQuery, MyInfoQueryVariables>(
    MyInfoDocument,
    baseOptions
  );
}
export function useMyInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyInfoQuery, MyInfoQueryVariables>
) {
  return Apollo.useLazyQuery<MyInfoQuery, MyInfoQueryVariables>(
    MyInfoDocument,
    baseOptions
  );
}
export type MyInfoQueryHookResult = ReturnType<typeof useMyInfoQuery>;
export type MyInfoLazyQueryHookResult = ReturnType<typeof useMyInfoLazyQuery>;
export type MyInfoQueryResult = Apollo.QueryResult<
  MyInfoQuery,
  MyInfoQueryVariables
>;
export const RegisterDocument = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password)
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const StudentsDocument = gql`
  query Students {
    students {
      _id
      firstName
      lastName
      college {
        _id
        name
      }
    }
  }
`;

/**
 * __useStudentsQuery__
 *
 * To run a query within a React component, call `useStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentsQuery(
  baseOptions?: Apollo.QueryHookOptions<StudentsQuery, StudentsQueryVariables>
) {
  return Apollo.useQuery<StudentsQuery, StudentsQueryVariables>(
    StudentsDocument,
    baseOptions
  );
}
export function useStudentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StudentsQuery,
    StudentsQueryVariables
  >
) {
  return Apollo.useLazyQuery<StudentsQuery, StudentsQueryVariables>(
    StudentsDocument,
    baseOptions
  );
}
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>;
export type StudentsLazyQueryHookResult = ReturnType<
  typeof useStudentsLazyQuery
>;
export type StudentsQueryResult = Apollo.QueryResult<
  StudentsQuery,
  StudentsQueryVariables
>;
