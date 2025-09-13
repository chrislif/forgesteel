import { Badge, Button, Segmented, Flex } from 'antd';
import { BookOutlined, PlayCircleOutlined, ReadOutlined, TeamOutlined } from '@ant-design/icons';
import { ErrorBoundary } from '../../controls/error-boundary/error-boundary';
import { useMediaQuery } from '../../../hooks/use-media-query';
import { useNavigation } from '../../../hooks/use-navigation';
import { ThemeToggle } from '../../../theme/theme-toggle';

import './app-footer.scss';

import shield from './../../../assets/shield.png';

interface Props {
	page: 'welcome' | 'heroes' | 'library' | 'playbook' | 'session' | 'player-view';
	highlightAbout: boolean;
	showReference: () => void;
	showRoll: () => void;
	showAbout: () => void;
}

export const AppFooter = (props: Props) => {
	const isSmall = useMediaQuery('(max-width: 1000px)');
	const navigation = useNavigation();

	const onNavigateChange = (navValue: Props["page"]) => {
		if (navValue !== props.page) {
			switch(navValue) {
				case "welcome":
					navigation.goToWelcome();
					break;
				case "heroes":
					navigation.goToHeroList();
					break;
				case "library":
					navigation.goToLibraryList('ancestry');
					break;
				case "playbook":
					navigation.goToPlaybookList('adventure');
					break;
				case "session":
					navigation.goToSession();
					break;
			}
		}
	}

	try {
		return (
			<ErrorBoundary>
				<Flex className='app-footer'>
					{
						isSmall || (props.page === 'player-view') ?
							<div />
							:
							<Segmented<Props["page"]> 
								defaultValue={props.page}
								options={[
									{ value: 'welcome', label: '', icon: <img className='logo-icon' src={shield} /> },
									{ value: 'heroes', label: 'Heroes', icon: <TeamOutlined /> },
									{ value: 'library', label: 'Library', icon: <BookOutlined /> },
									{ value: 'playbook', label: 'Playbook', icon: <ReadOutlined /> },
									{ value: 'session', label: 'Session', icon: <PlayCircleOutlined /> }
								]}
								onChange={onNavigateChange}>
							</Segmented>
					}
					<div className='action-buttons-panel'>
						<Button onClick={props.showReference}>Reference</Button>
						<Button onClick={props.showRoll}>Roll</Button>
						<Badge dot={props.highlightAbout}>
							<Button onClick={props.showAbout}>About</Button>
						</Badge>
						<ThemeToggle />
					</div>
				</Flex>
			</ErrorBoundary>
		);
	} catch (ex) {
		console.error(ex);
		return null;
	}
};
