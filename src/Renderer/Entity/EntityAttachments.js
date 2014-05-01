/**
 * Renderer/EntityAttachments.js
 *
 * Helper to manage entity's attachment
 *
 * This file is part of ROBrowser, Ragnarok Online in the Web Browser (http://www.robrowser.com/).
 *
 * @author Vincent Thibault
 */
define(['Core/Client', 'Renderer/Renderer', 'Renderer/SpriteRenderer', 'Renderer/Camera'],
function(     Client,            Renderer,            SpriteRenderer,            Camera )
{
	'use strict';


	/**
	 * AttachmentManager class
	 */
	function AttachmentManager()
	{
		this.list = [];
	}


	/**
	 * Add an attachment
	 *
	 * @param {object} attachment options
	 */
	AttachmentManager.prototype.add = function add( attachment )
	{
		if (attachment.uid) {
			this.remove(attachment.uid);
		}

		attachment.startTick = Renderer.tick;
		attachment.opacity   = 'opacity' in attachment ? attachment.opacity : 1.0;

		if (attachment.file) {
			attachment.spr       = 'data/sprite/\xc0\xcc\xc6\xd1\xc6\xae/' + attachment.file + '.spr';
			attachment.act       = 'data/sprite/\xc0\xcc\xc6\xd1\xc6\xae/' + attachment.file + '.act';
		}

		Client.loadFile(attachment.spr, null, null, {to_rgba:true});

		this.list.push(attachment);
	};


	/**
	 * Remove an attachment
	 *
	 * @param {mixed} unique id
	 */
	AttachmentManager.prototype.remove = function remove( uid )
	{
		var i, count;
		var list;

		list  = this.list;
		count = list.length;

		for (i = 0; i < count; ++i) {
			if (list[i].uid === uid) {
				list.splice(i, 1);
				i--;
				count--;
			}
		}
	};


	/**
	 * Rendering attachments
	 *
	 * @param {Entity} entity attached
	 * @param {number} game tick
	 */
	AttachmentManager.prototype.render = function renderClosure()
	{
		var effectColor = new Float32Array(4);
		var resetColor  = new Float32Array([1.0, 1.0, 1.0, 1.0]);

		return function render( entity, tick )
		{
			var list;
			var i, count;

			list  = this.list;
			count = list.length;

			effectColor.set(entity.effectColor);
			entity.effectColor.set(resetColor);

			for (i = 0; i < count; ++i) {
				if (this.renderAttachment( entity, this.list[i], tick)) {
					list.splice(i, 1);
					i--;
					count--;
				}
			}

			SpriteRenderer.depth = 0.0;
			entity.effectColor.set(effectColor);
		};
	}();


	/**
	 * Render an attachment
	 *
	 * @param {Entity} entity attached
	 * @param {object} attachment options
	 * @param {number} game tick
	 * @return {boolean} remove from the list
	 */
	AttachmentManager.prototype.renderAttachment = function renderAttachmentClosure()
	{
		var position = new Int16Array(2);

		return function renderAttachment( entity, attachment, tick)
		{
			var i, count;
			var spr, act, pos, delay, frame;
			var animation, animations, layers;
			var clean = false;

			spr   = Client.loadFile(attachment.spr);
			act   = Client.loadFile(attachment.act);

			if (!spr || !act) {
				return clean;
			}

			entity.effectColor[3]  = attachment.opacity;
			position[1]            = attachment.head ? -100 : 0;
			frame                  = 'frame'   in attachment ? attachment.frame : (Camera.direction + entity.direction + 8) % 8;
			frame                 %= act.actions.length;
			animations             = act.actions[frame].animations;
			delay                  = attachment.delay || act.actions[frame].delay;
			SpriteRenderer.depth   = attachment.depth || 0.0;

			// pause
			if ('animationId' in attachment) {
				layers = animations[attachment.animationId].layers;
			}

			// repeat animation
			else if (attachment.repeat) {
				layers = animations[ Math.floor((tick - attachment.startTick) / delay) % animations.length].layers;
			}

			// stop at end
			else {
				animation = Math.min( Math.floor((tick - attachment.startTick) / delay), animations.length-1);
				layers    = animations[animation].layers;

				if (animation === animations.length - 1) {
					clean = true;
				}
			}

			// render layers
			for (i = 0, count = layers.length; i < count; ++i) {
				entity.renderLayer(layers[i], spr, spr, 1.0, position, false);
			}

			return clean;
		};
	}();


	/**
	 * Export
	 */
	return function init()
	{
		this.attachments = new AttachmentManager();
	};
});