import { Plugin, Notice } from 'obsidian';
import { getDailyNote, getAllDailyNotes } from 'obsidian-daily-notes-interface';

import moment from 'moment';

import { S_BUTTON_TEXT, S_NOTE_NOT_EXISTS } from 'strings';

export default class PrevYearNotePlugin extends Plugin {
	async onload() {
		const ribbonIconEl = this.addRibbonIcon('calendar-clock', S_BUTTON_TEXT, async (evt: MouseEvent) => {
			const date = moment();

			date.subtract(1, 'years');

			const PrevYearNoteFile = getDailyNote(date, getAllDailyNotes());

			if (PrevYearNoteFile) {
				const { workspace } = this.app;

				await workspace.getLeaf(true).openFile(PrevYearNoteFile);
			}
			else {
				new Notice(S_NOTE_NOT_EXISTS);
			}
		});
	}

	onunload() {
	}
}