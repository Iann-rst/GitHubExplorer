import React from 'react';
import { useRoute } from '@react-navigation/core';
import { Linking } from 'react-native';
import { useRepositories } from '../../hooks/useRepositories';

import { Background } from '../../components/Background';
import { Card } from '../../components/Card';

import {
  Container,
  RepoInfo,
  OwnerAvatar,
  TextGroup,
  Description,
  RepoStats,
  Stars,
  StarsCounter,
  StarsText,
  Forks,
  ForksCounter,
  ForksText,
  OpenIssues,
  OpenIssuesCounter,
  OpenIssuesText,
  IssuesList,
} from './styles';
import { TitleAnimation } from './TitleAnimation';

interface RepositoryParams {
  repositoryId: number;
}

export function Repository() {
  const { params } = useRoute();
  const { repositoryId } = params as RepositoryParams;
  const { findRepositoryById } = useRepositories();
  const repository = findRepositoryById(repositoryId);

  function handleIssueNavigation(issueUrl: string) {
    // TODO - use Linking to open issueUrl in a browser
    Linking.openURL(issueUrl);
  }

  return (
    <Background>
      <Container>
        <RepoInfo>
          {<OwnerAvatar source={{ uri: repository.owner.avatar_url }} />}

          <TextGroup>
            <TitleAnimation>
              {
                repository.full_name
                // TODO - full name of the repository
              }
            </TitleAnimation>

            <Description numberOfLines={2}>{
              repository.description
              //TODO - repository description
            }</Description>
          </TextGroup>
        </RepoInfo>

        <RepoStats>
          <Stars>
            <StarsCounter>{
              repository.stargazers_count
              // TODO - repository stargazers count
            }</StarsCounter>
            <StarsText>Stars</StarsText>
          </Stars>

          <Forks>
            <ForksCounter>{
              repository.forks_count
              // TODO - repository forks count
            }</ForksCounter>
            <ForksText>Forks</ForksText>
          </Forks>

          <OpenIssues>
            <OpenIssuesCounter>{
              repository.open_issues_count
              // TODO - repository issues count
            }</OpenIssuesCounter>
            <OpenIssuesText>Issues{'\n'}Abertas</OpenIssuesText>
          </OpenIssues>
        </RepoStats>

        <IssuesList
          data={repository.issues}
          keyExtractor={issue => String(issue.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: issue }) => (
            <Card
              data={{
                id: issue.id,
                title: issue.title,
                subTitle: issue.user.login,
              }}
              onPress={() => handleIssueNavigation(issue.html_url)}
            // TODO - onPress prop calling 
            />
          )}
        />
      </Container>
    </Background>
  )
}